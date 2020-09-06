ActionMailer::Base.smtp_settings = {
  :user_name => Rails.application.credentials.dig(:sendgrid, :username),
  :password => Rails.application.credentials.dig(:sendgrid, :private_key),
  :domain => 'www.yourdomain.com',
  :address => 'smtp.sendgrid.net',
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}
