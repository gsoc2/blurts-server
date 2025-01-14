# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


# Settings page

settings-meta-title = { -brand-fx-monitor } - Настройки
settings-page-title = Настройки { -product-short-name }

## Breach alert preferences

settings-alert-preferences-title = Настройки оповещений об утечках
settings-alert-preferences-option-one = Отправлять оповещения об утечках на затронутые ими адреса электронной почты
settings-alert-preferences-option-two = Отправлять все оповещения об утечках на основной адрес электронной почты

## Monitored email addresses

# Variables:
#   $email (string) - Email address
settings-email-label-primary = { $email } (основной)
settings-email-list-title = Отслеживаемые адреса электронной почты
# Variables:
#   $limit (number) - Number of email addresses included in the plan
settings-email-limit-info =
    { $limit ->
        [one] Ваш аккаунт включает мониторинг до { $limit } адреса электронной почты.
        [few] Ваш аккаунт включает мониторинг до { $limit } адресов электронной почты.
        [many] Ваш аккаунт включает мониторинг до { $limit } адресов электронной почты.
       *[other] Ваш аккаунт включает мониторинг до { $limit } адресов электронной почты.
    }
settings-email-verification-callout = Требуется верификация электронной почты
settings-resend-email-verification-link = Отправить письмо подтверждения заново
settings-add-email-button = Добавить адрес электронной почты
settings-delete-email-button = Удалить адрес электронной почты
# This string is shown beneath each of the user’s email addresses to indicate
# how many known breaches that email address was found in.
# Variables:
#   $breachCount (numer) - Number of breaches
settings-email-number-of-breaches-info =
    { $breachCount ->
        [one] Найден в { $breachCount } известной утечке.
        [few] Найден в { $breachCount } известных утечках.
        [many] Найден в { $breachCount } известных утечках.
       *[other] Найден в { $breachCount } известных утечках.
    }

## Cancel Premium subscription

settings-cancel-premium-subscription-title = Отменить подписку на { -brand-premium }
settings-cancel-premium-subscription-info = Ваша подписка вернется к бесплатному аккаунту после окончания текущего платежного цикла. Ваши результаты проверки защиты конфиденциальности будут удалены без возможности восстановления, и вы сможете отслеживать утечки данных только для 1 адреса электронной почты.
settings-cancel-premium-subscription-link-label = Отменить с вашего { -brand-fx-account }

## Deactivate account

settings-deactivate-account-title = Деактивировать аккаунт
# Deprecated
settings-deactivate-account-info = Вы можете деактивировать { -product-short-name }, удалив свой { -brand-fx-account(case: "nominative") }.
settings-deactivate-account-info-2 = Вы можете деактивировать { -product-short-name }, удалив свой { -brand-mozilla-account }.
# Deprecated
settings-fxa-link-label = Перейти в настройки { -brand-firefox }.
settings-fxa-link-label-3 = Перейти в настройки { -brand-mozilla-account }.

## Add email dialog

settings-email-dialog-title = Добавить ещё один адрес электронной почты
settings-add-email-text = Добавьте новый адрес электронной почты, чтобы узнать, был ли он затронут утечкой.
settings-email-input-label = Адрес электронной почты
settings-send-email-verification-button = Отправить ссылку для подтверждения

## Unsubscribe Dialog Survey

settings-unsubscribe-dialog-title = Нам жаль, что вы уходите. <br /> Расскажите нам, почему вы уходите?
settings-unsubscribe-dialog-info = Ваш опыт важен для нас. Мы читаем каждый отзыв и учитываем его.
settings-unsubscribe-dialog-message-placeholder = Что могло было сделать лучше?
# $faq_href is the URL for the faq page. HTML tags should not be translated, e.g. `<a>`
settings-unsubscribe-dialog-confirmation = Обратите внимание, что все ваши услуги { -brand-monitor-premium } будут <a { $faq_href }>безвозвратно удалены</a> после окончания текущего платежного цикла.
settings-unsubscribe-dialog-continue = Перейти к отмене
settings-unsubscribe-dialog-cancel = Не важно, верните меня обратно
