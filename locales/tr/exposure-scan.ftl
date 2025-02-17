exposure-landing-hero-heading = Kişisel bilgilerinizin ele geçirilip geçirilmediğini öğrenin
exposure-landing-hero-email-label = E-posta adresi
exposure-landing-hero-email-placeholder = E-posta adresinizi girin
exposure-landing-hero-cta-label = İhlalleri kontrol edin
exposure-landing-result-loading = Yükleniyor, lütfen bekleyin…
exposure-landing-result-error = İhlaller kontrol edilirken bir sorun oluştu. Lütfen sayfayı tazeleyip tekrar deneyin.
# Variables:
#   $email (string) - The user's email address, used to identify their data in breaches
#   $count (number) - Number of data breaches in which the user's data was found
exposure-landing-result-hero-heading =
    { $count ->
        [one] <email>{ $email }</email> adresinin <count>1</count> veri ihlalinde açığa çıktığını bulduk.
       *[other] <email>{ $email }</email> adresinin <count>{ $count }</count> veri ihlalinde açığa çıktığını bulduk.
    }
exposure-landing-result-card-added = Eklenme tarihi:
exposure-landing-result-card-data = Ele geçirilen veriler:
exposure-landing-result-card-nothing = İhlal bulunamadı
exposure-landing-result-footer-attribution = İhlal verileri <hibp-link>{ -brand-HIBP }</hibp-link> tarafından sağlanmaktadır
exposure-landing-result-overflow-hero-cta-label = İhlalleri çözmek için giriş yapın
exposure-landing-result-overflow-footer-cta-label = Tümünü görüntülemek için giriş yapın
exposure-landing-result-some-hero-cta-label = İhlalleri çözmek için giriş yapın
exposure-landing-result-some-footer-cta-label = İhlalleri çözmek için giriş yapın
exposure-landing-result-none-hero-lead = Haberler iyi! Bilinen hiçbir bir ihlalde yer almıyorsunuz. Güvende kalmak için yeni ihlal uyarılarına kaydolabilirsiniz. Kaydolduğunuzda bu e-posta adresini izlemeye devam eder ve yeni bir ihlale karıştığını tespit edersek size haber veririz.
exposure-landing-result-none-hero-cta-label = Yeni ihlallerden haberdar olun
exposure-landing-result-none-footer-cta-label = Uyarılara kaydolun
