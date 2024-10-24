import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Gap } from '@alfalab/core-components/gap';
import { Grid } from '@alfalab/core-components/grid';
import { InputMobile } from '@alfalab/core-components/input/mobile';
import { Switch } from '@alfalab/core-components/switch';
import { Typography } from '@alfalab/core-components/typography';
import { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import card from './assets/card.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';

const slides = [
  {
    perYear: 2000,
    perMonth: 200,
    sale: 400,
    sum: 80_000,
    death: 50_000,
    injury: 30_000,
  },
  {
    perYear: 4000,
    perMonth: 400,
    sale: 800,
    sum: 270_000,
    death: 200_000,
    injury: 70_000,
  },
  {
    perYear: 6000,
    perMonth: 600,
    sale: 1200,
    sum: 430_000,
    death: 250_000,
    injury: 180_000,
  },
  {
    perYear: 8000,
    perMonth: 800,
    sale: 1600,
    sum: 625_000,
    death: 425_000,
    injury: 200_000,
  },
  {
    perYear: 10000,
    perMonth: 1000,
    sale: 2000,
    sum: 1_500_000,
    death: 500_000,
    injury: 250_000,
    hospitality: 250_000,
  },
];
const now = new Date();
const dateY = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
const dateNY = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear() + 1}`;
const dateM = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
const dateNM = `${now.getDate()}.${now.getMonth() + 2}.${now.getFullYear()}`;

export const App = () => {
  const [anotherPersonCheck, setAnotherPersonCheck] = useState(false);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [selectedBtn, setSelectedBtn] = useState<'y' | 'm'>('y');
  const selectedSlideItem = slides[selectedSlideIndex];

  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));

  const submit = () => {
    if (!email) {
      setError('Укажите куда прислать документы');
      return;
    }
    setLoading(true);

    // LS.setItem(LSKeys.ShowThx, true);
    setThx(true);
    setLoading(false);
    // sendDataToGA({
    //   autopayments: Number(checked) as 1 | 0,
    //   limit: Number(checked2) as 1 | 0,
    //   limit_sum: limit ?? 0,
    //   insurance: Number(checked3) as 1 | 0,
    //   email: email ? 1 : 0,
    // }).then(() => {
    // });
  };

  const steps = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <>
            <div>
              <Typography.Text view="caps" color="secondary">
                ШАГ 1 из 2. ВЫБОР УСЛОВИЙ
              </Typography.Text>
              <Typography.TitleResponsive
                style={{ marginBottom: '.5rem' }}
                tag="h1"
                view="small"
                font="system"
                weight="semibold"
              >
                От несчастных случаев
              </Typography.TitleResponsive>
              <Typography.Text view="primary-medium">
                Страхование от несчастных случаев круглосуточно по всему миру
              </Typography.Text>
            </div>
            <Switch
              block
              reversed
              checked={anotherPersonCheck}
              label="Оформить для другого человека"
              onChange={() => setAnotherPersonCheck(prevState => !prevState)}
            />

            <div>
              <Swiper spaceBetween={8} slidesPerView={1} onSlideChange={v => setSelectedSlideIndex(v.activeIndex)}>
                {slides.map(s => (
                  <SwiperSlide className={appSt.slide} key={s.perYear}>
                    <div>
                      <Typography.TitleResponsive tag="h2" view="small" font="system" weight="semibold">
                        {s.perYear.toLocaleString('ru')} ₽
                      </Typography.TitleResponsive>
                      <Typography.Text view="primary-small" color="positive">
                        Скидка {s.sale.toLocaleString('ru')} ₽
                      </Typography.Text>
                    </div>
                    <Typography.Text view="primary-medium">Сумма выплат - до {s.sum.toLocaleString('ru')} ₽</Typography.Text>
                    {s.hospitality && (
                      <Typography.Text view="primary-medium" color="link">
                        Рекомендовано для Alfa Only
                      </Typography.Text>
                    )}
                    <div>
                      <Typography.Text view="component-primary" color="secondary">
                        Уход из жизни или инвалидность 1 группы
                      </Typography.Text>
                      <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                        до {s.death.toLocaleString('ru')} ₽
                      </Typography.Text>
                    </div>
                    <div>
                      <Typography.Text view="component-primary" color="secondary">
                        Травма
                      </Typography.Text>
                      <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                        до {s.injury.toLocaleString('ru')} ₽
                      </Typography.Text>
                    </div>
                    {s.hospitality && (
                      <div>
                        <Typography.Text view="component-primary" color="secondary">
                          Госпитализация
                        </Typography.Text>
                        <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                          до {s.hospitality.toLocaleString('ru')} ₽
                        </Typography.Text>
                      </div>
                    )}
                    <Typography.Text style={{ marginTop: 'auto' }} view="component-primary" color="secondary">
                      Эти выплаты вы получите в результате несчастных случаев
                    </Typography.Text>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div>
              <Typography.Text view="primary-medium" color="secondary" tag="p">
                Оплата страховки
              </Typography.Text>

              <div>
                <Grid.Row gutter={16}>
                  <Grid.Col width="6">
                    <ButtonMobile
                      size="xs"
                      style={{ width: '100%' }}
                      view={selectedBtn === 'y' ? 'primary' : 'secondary'}
                      rightAddons={<CDNIcon color="#0d9336" name="glyph_flash_s" />}
                      onClick={() => setSelectedBtn('y')}
                    >
                      Сразу на год
                    </ButtonMobile>
                  </Grid.Col>
                  <Grid.Col width="6">
                    <ButtonMobile
                      size="xs"
                      style={{ width: '100%' }}
                      view={selectedBtn === 'm' ? 'primary' : 'secondary'}
                      onClick={() => setSelectedBtn('m')}
                    >
                      Каждый месяц
                    </ButtonMobile>
                  </Grid.Col>
                </Grid.Row>
              </div>
            </div>

            <div className={appSt.row}>
              <CDNIcon color="#0d9336" name="glyph_flash_m" />
              <Typography.Text view="primary-medium" color="positive">
                Выгоднее оплатить сразу на год
              </Typography.Text>
            </div>

            <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h2" view="small" font="system" weight="semibold">
              Включено в программу
            </Typography.TitleResponsive>

            <div className={appSt.row}>
              <div className={appSt.imgBox}>
                <CDNIcon name="glyph_paper-airplane_m" className={appSt.plane} />
              </div>

              <div>
                <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                  Медицинский навигатор
                </Typography.Text>
                <Typography.Text view="primary-small" color="secondary">
                  Поможем подобрать клинику и хорошего специалиста
                </Typography.Text>
              </div>
            </div>

            <div className={appSt.row}>
              <div className={appSt.imgBox}>
                <CDNIcon name="glyph_cross-medicine_m" />
              </div>

              <div>
                <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                  Мнение второго врача
                </Typography.Text>
                <Typography.Text view="primary-small" color="secondary">
                  Эксперт проверит ваш диагноз и назначенное лечение
                </Typography.Text>
              </div>
            </div>
            <div className={appSt.row}>
              <div className={appSt.imgBox}>
                <CDNIcon name="glyph_world_m" />
              </div>

              <div>
                <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                  Доступ к ifeelgood.life
                </Typography.Text>
                <Typography.Text view="primary-small" color="secondary">
                  Онлайн-платформа о хорошем самочуствии
                </Typography.Text>
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div>
              <Typography.Text view="caps" color="secondary">
                ШАГ 2 из 2. ПОКУПКА
              </Typography.Text>
              <Typography.TitleResponsive
                style={{ marginBottom: '.5rem' }}
                tag="h1"
                view="small"
                font="system"
                weight="semibold"
              >
                Проверьте данные перед подписанием документов
              </Typography.TitleResponsive>
            </div>
            <div>
              <Typography.Text view="component-primary" color="secondary">
                Стоимость страховки
              </Typography.Text>
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                {selectedBtn === 'y'
                  ? selectedSlideItem.perYear.toLocaleString('ru')
                  : selectedSlideItem.perMonth.toLocaleString('ru')}{' '}
                ₽ в {selectedBtn === 'm' ? 'месяц' : 'год'}
              </Typography.Text>
            </div>

            <div>
              <Typography.Text view="component-primary" color="secondary">
                Общая сумма выплат
              </Typography.Text>
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                {selectedSlideItem.sum.toLocaleString('ru')} ₽
              </Typography.Text>
            </div>
            <div>
              <Typography.Text view="component-primary" color="secondary">
                Срок страхования
              </Typography.Text>
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                {selectedBtn === 'm' ? `Один месяц  (${dateM} – ${dateNM})` : `Один год (${dateY} – ${dateNY})`}
              </Typography.Text>
            </div>
            <div>
              <Typography.Text view="component-primary" color="secondary">
                Счёт списания
              </Typography.Text>

              <div className={appSt.boxCard}>
                <img src={card} width={48} height={30} />
                <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                  Текущий счёт
                </Typography.Text>
              </div>
            </div>

            <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h2" view="small" font="system" weight="semibold">
              Документы
            </Typography.TitleResponsive>

            <div className={appSt.row}>
              <CDNIcon name="glyph_document-lines_m" color="rgba(4, 4, 19, 0.55)" />
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                Полис-оферта
              </Typography.Text>
            </div>
            <div className={appSt.row}>
              <CDNIcon name="glyph_document-lines_m" color="rgba(4, 4, 19, 0.55)" />
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                Поручение за перевод
              </Typography.Text>
            </div>
            <div className={appSt.row} style={{ marginBottom: '1rem' }}>
              <CDNIcon name="glyph_document-lines_m" color="rgba(4, 4, 19, 0.55)" />
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                Правила страхования
              </Typography.Text>
            </div>
            <InputMobile
              labelView="outer"
              label="Куда прислать документы"
              type="email"
              block
              value={email}
              onChange={(_, { value }) => setEmail(value)}
            />

            <Typography.Text color="secondary" view="secondary-small">
              Нажимая на кнопку «Оплатить», вы подтверждаете ознакомление и соглашаетесь с условиями Полиса-оферты и
              Правилами страхования. После нажатия на кнопку «Оплатить», вы будете перенаправлены на страницу подписания
              документов и оплаты полиса страхования.
            </Typography.Text>
          </>
        );
      default:
        return null;
    }
  }, [step, anotherPersonCheck, selectedBtn, selectedSlideItem, email]);

  if (thxShow) {
    return <ThxLayout />;
  }
  return (
    <>
      <div className={appSt.container}>{steps}</div>
      <Gap size={128} />

      <div className={appSt.bottomBtn}>
        {step === 1 ? (
          <ButtonMobile block view="primary" className={appSt.btn} onClick={() => setStep(2)}>
            <div className={appSt.btnContainer}>
              <div>
                <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="bold">
                  {selectedBtn === 'm'
                    ? selectedSlideItem.perMonth.toLocaleString('ru')
                    : selectedSlideItem.perYear.toLocaleString('ru')}{' '}
                  ₽ в {selectedBtn === 'm' ? 'месяц' : 'год'}
                </Typography.TitleResponsive>
                {selectedBtn === 'y' && (
                  <Typography.Text view="primary-medium" color="positive" defaultMargins={false}>
                    С учётом скидки {selectedSlideItem.sale.toLocaleString('ru')} ₽
                  </Typography.Text>
                )}
                <Typography.Text
                  style={{ marginTop: '.5rem' }}
                  color="secondary-inverted"
                  tag="p"
                  view="primary-medium"
                  defaultMargins={false}
                >
                  Сумма выплат - до {selectedSlideItem.sum.toLocaleString('ru')} ₽
                </Typography.Text>
              </div>

              <div className={appSt.btnContainer}>
                <div className={appSt.btnArrow}>
                  <CDNIcon name="glyph_arrow-right_m" color="#000000" />
                </div>
              </div>
            </div>
          </ButtonMobile>
        ) : (
          <ButtonMobile block view="primary" loading={loading} hint={err} onClick={submit}>
            Оплатить
          </ButtonMobile>
        )}
      </div>
    </>
  );
};