# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


# Settings page

settings-meta-title = { -brand-fx-monitor } - 設定
settings-page-title = { -product-short-name } 選項

## Breach alert preferences

settings-alert-preferences-title = 資料外洩警示偏好設定
settings-alert-preferences-option-one = 傳送資料外洩警報到受影響的電子郵件信箱
settings-alert-preferences-option-two = 傳送資料外洩警報到主要電子郵件信箱

## Monitored email addresses

# Variables:
#   $email (string) - Email address
settings-email-label-primary = { $email }（主要）
settings-email-list-title = 監控中的電子郵件信箱
# Variables:
#   $limit (number) - Number of email addresses included in the plan
settings-email-limit-info = 您的帳號可監控最多 { $limit } 組信箱。
settings-email-verification-callout = 需要驗證信箱
settings-resend-email-verification-link = 重寄驗證信
settings-add-email-button = 新增電子郵件地址
settings-delete-email-button = 刪除電子郵件地址
# This string is shown beneath each of the user’s email addresses to indicate
# how many known breaches that email address was found in.
# Variables:
#   $breachCount (numer) - Number of breaches
settings-email-number-of-breaches-info = 出現在 { $breachCount } 場已知的外洩事件中。

## Cancel Premium subscription

settings-cancel-premium-subscription-title = 取消 { -brand-premium } 訂閱
settings-cancel-premium-subscription-info = 將在目前的帳務週期結束後恢復為免費帳號訂閱。將永久刪除您的隱私保護掃描結果，且僅能監控 1 個信箱的資料外洩事件。
settings-cancel-premium-subscription-link-label = 從 { -brand-fx-account } 取消

## Deactivate account

settings-deactivate-account-title = 停用帳號
# Deprecated
settings-deactivate-account-info = 您可以刪除 { -brand-fx-account } 來停用 { -product-short-name }。
settings-deactivate-account-info-2 = 您可以刪除 { -brand-mozilla-account }來停用 { -product-short-name }。
# Deprecated
settings-fxa-link-label = 前往 { -brand-firefox } 設定
settings-fxa-link-label-3 = 前往 { -brand-mozilla-account }設定

## Add email dialog

settings-email-dialog-title = 新增另一組電子郵件地址
settings-add-email-text = 新增電子郵件信箱，即可瞭解相關資料是否曾遭外洩。
settings-email-input-label = 電子郵件地址
settings-send-email-verification-button = 寄送驗證鏈結

## Unsubscribe Dialog Survey

settings-unsubscribe-dialog-title = 很遺憾您要離開。<br />您願意告訴我們為什麼要離開嗎？
settings-unsubscribe-dialog-info = 您的體驗對我們來說非常重要，我們會閱讀每一份填答結果並且慎重處理。
settings-unsubscribe-dialog-message-placeholder = 我們有什麼事情能夠改善？
# $faq_href is the URL for the faq page. HTML tags should not be translated, e.g. `<a>`
settings-unsubscribe-dialog-confirmation = 請注意，在您目前帳務週期結束後，將<a { $faq_href }>永久刪除</a>您的所有 { -brand-monitor-premium } 服務。
settings-unsubscribe-dialog-continue = 繼續取消
settings-unsubscribe-dialog-cancel = 沒關係帶我回去
