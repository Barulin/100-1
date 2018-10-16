import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RoundService } from '../../services/round.service';
import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';
import { STRICT_POINTS } from '../../model/i-round';
import { IRound } from '../../model/i-round';
import { IQuestion } from '../../model/i-question';
import { IAnswer } from '../../model/i-answer';
import { Subject } from 'rxjs/Subject';
import { ISubscription } from 'rxjs/Subscription';

const ERROR_TEXTS = {
  DEFAULT: 'Что-то пошло не так...',
  QUESTION_EMPTY: 'Пожалуйста, впишите свой вопрос.',
  ANSWERS_EMPTY: 'Укажите все варианты ответов.',
  POINTS_EMPTY: 'Укажите количество очков для каждого варианта ответа.',
  POINTS_OUTSIDE: 'Количество очков должно быть указано в пределах от 1 до 99.',
  POINTS_SUM_TOO_BIG: 'Сумма очков должна быть не больше 100.'
}

const SAMPLE_ROUNDS = [{
    question: 'Какой банк в Росии самый популярный?',
    content1: 'Тинькофф',
    points1: 32,
    content2: 'Сбербанк',
    points2: 25,
    content3: 'ВТБ',
    points3: 15,
    content4: 'Альфа-Банк',
    points4: 11,
    content5: 'Открытие',
    points5: 5,
    content6: 'Райффайзен',
    points6: 3
  },{
    question: 'Куда вложить деньги?',
    content1: 'Открыть счёт',
    points1: 34,
    content2: 'Купить акции',
    points2: 19,
    content3: 'Купить недвижимость',
    points3: 14,
    content4: 'В образование',
    points4: 9,
    content5: 'Купить биткоины',
    points5: 7,
    content6: 'Убрать их под подушку',
    points6: 6
  },{
    question: 'Кем люди хотят стать когда вырастут?',
    content1: 'Менеджером',
    points1: 28,
    content2: 'Космонавтом',
    points2: 21,
    content3: 'Моряком',
    points3: 18,
    content4: 'Полицейским',
    points4: 13,
    content5: 'Президентом',
    points5: 8,
    content6: 'Программистом',
    points6: 2
  },{
    question: 'Какой язык программирования самый популярный?',
    content1: 'Javascript',
    points1: 15,
    content2: 'Java',
    points2: 30,
    content3: 'Python',
    points3: 60,
    content4: 'PHP',
    points4: 120,
    content5: 'C',
    points5: 180,
    content6: 'Ruby',
    points6: 240
}]

@Component({
  selector: 'app-round-description',
  templateUrl: './round-description.component.html',
  styleUrls: ['./round-description.component.css']
})
export class RoundDescriptionComponent implements OnInit {
  @Input() round: IRound;
  @Input() question: IQuestion;
  @Input() answers: IAnswer[];
  @Input() isSelectedRound: boolean;

  form: FormGroup;
  hasError = false;
  errorText = '';
  private subscription: ISubscription;

  constructor(private roundService: RoundService,
              private questionService: QuestionService,
              private answerService: AnswerService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    const formDescription = {
      question: [this.question.content, [Validators.required, Validators.maxLength(64)]]
    };
    this.answers.forEach(a => {
      formDescription['content' + a.index] = [a.content, [Validators.required, Validators.maxLength(64)]];
      if (this.round.pointsStrict) {
        formDescription['points' + a.index] = [STRICT_POINTS[a.index], [Validators.required, Validators.pattern(/^\d+$/)]];
      } else {
        formDescription['points' + a.index] = [a.points, [Validators.required, Validators.min(1), Validators.max(99), Validators.pattern(/^\d+$/)]];
      }
    });

    this.form = this.fb.group(formDescription);

    if (this.round.pointsStrict) {
      this.answers.forEach(a => {
        this.form.get('points' + a.index).disable();
      });
    }

    //this.form.setValidators([this.nonEmpty.bind(this)]);

    // ТЕСТОВЫЕ ДАННЫЕ ////////////////////////////////////////////////////////////////
    //this.form.setValue(SAMPLE_ROUNDS[this.round.index-1]);
    // ТЕСТОВЫЕ ДАННЫЕ ////////////////////////////////////////////////////////////////

    this.subscription = this.roundService.validate$.subscribe(() => {
      this.validate();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  validate() {
    let pointsSum = 0;

    this.hasError = this.form.invalid;
    this.errorText = ERROR_TEXTS.DEFAULT;

    if (this.form.get('question').errors) {
      this.errorText = ERROR_TEXTS.QUESTION_EMPTY;
    }
    this.answers.forEach(a => {
      if (this.form.get('content' + a.index).errors) {
        this.errorText = ERROR_TEXTS.ANSWERS_EMPTY;
      }

      if (!this.round.pointsStrict) {
        if (this.form.get('points' + a.index).errors && 
            this.form.get('points' + a.index).errors['required']) {
          this.errorText = ERROR_TEXTS.POINTS_EMPTY;
        }
        if (this.form.get('points' + a.index).errors && 
            (this.form.get('points' + a.index).errors['min'] || 
            this.form.get('points' + a.index).errors['max'])) {
          this.errorText = ERROR_TEXTS.POINTS_OUTSIDE;
        }
        pointsSum += this.form.get('points' + a.index).value;
        if (pointsSum > 100) {
          this.errorText = ERROR_TEXTS.POINTS_SUM_TOO_BIG;
          this.hasError = true;
        }
      }
    });

    if (this.hasError) {
      if (!this.roundService.invalidRound) {
        this.roundService.invalidRound = this.round;
      }
      this.roundService.validateState.next(false);

      return;
    }

    this.roundService.validateStates[this.round.index] = true;
    this.roundService.validateState.next(true);

    this.question.content = this.form.value['question'];
    this.answers.forEach(a => {
      a.content = this.form.value['content' + a.index];
      if (this.round.pointsStrict) {
        a.points =  STRICT_POINTS[a.index];
      } else {
        a.points = this.form.value['points' + a.index];
      }
    })

    this.questionService.setQuestionForRound(this.question, this.round);
    this.answerService.setAnswersForRound(this.answers, this.round);
  }
}
