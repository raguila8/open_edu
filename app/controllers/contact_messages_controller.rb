class ContactMessagesController < ApplicationController
  def create
    @message = ContactMessage.new message_params

    if @message.valid?
      ContactMessageMailer.contact(@message).deliver_now
      @response = { message: "We have received your message and will be in touch soon!", type: 'success' }
    else
      @response = { message: "There was an error sending your message. Please try again.", type: 'error' }
    end
  end

  def new
    @message = ContactMessage.new
  end

  private
  
  def message_params
    params.require(:contact_message).permit(:name, :email, :body)
  end
end
