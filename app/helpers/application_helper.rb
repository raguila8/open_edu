module ApplicationHelper
  def flash_icon_color_for(type)
    case type
    when "error"
      'text-red-400'
    when "warning"
      'text-orange-400'
    when "success"
      'text-green-400'
    when "notice"
      'text-blue-400'
    end
  end

  def flash_message_title_for(msg, type)
    sentences = msg.scan(/[^\.!?]+[\.!?]/).map(&:strip)
    sentences.count >= 2 ? sentences.first.chomp('.') : type.titleize
  end

  def flash_message_subtext_for(msg)
    sentences = msg.scan(/[^\.!?]+[\.!?]/).map(&:strip)
    sentences.count >= 2 ? sentences[1..-1].join(" ") : msg
  end

  def avatar_path(object, options = {})
    size = options[:size] || 180
    default_image = options[:default] || "mp"
    base_url =  "https://secure.gravatar.com/avatar"
    base_url_params = "?s=#{size}&d=#{default_image}"
    
    if object.respond_to?(:avatar) && object.avatar.attached? && object.avatar.variable?
      rails_representation_url(object.avatar.variant(resize_to_fill: [size, size, { gravity: 'Center' }]))
    elsif object.respond_to?(:email) && object.email
      gravatar_id = Digest::MD5::hexdigest(object.email.downcase)
      "#{base_url}/#{gravatar_id}#{base_url_params}"
    else
      "#{base_url}/00000000000000000000000000000000#{base_url_params}"
    end
  end
end
