class ApplicationController < ActionController::API

  def current_profile
    return Profile.find(1)
    
    token = request.headers["Authorization"].to_s.split(" ").last
    payload, header = *JSONWebToken.verify(token)

    Profile.from_auth_hash(payload)
  rescue JWT::VerificationError, JWT::DecodeError => error
    nil
  end
end
