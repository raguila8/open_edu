class ContactMessageMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.message_mailer.contact_me.subject
  #
  def contact(message)
    @body = message.body
    @name = message.name

    mail to: "foobar@email.com", from: message.email, subject: "Contact Form Message"
  end
end
