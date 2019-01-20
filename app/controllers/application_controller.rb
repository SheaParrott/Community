class ApplicationController < ActionController::API

  # def current_profile
  #   # return Profile.find(1)
    
  #   token = request.headers["Authorization"].to_s.split(" ").last
  #   payload, header = *JSONWebToken.verify(token)

  #   Profile.from_auth_hash(payload)
  # rescue JWT::VerificationError, JWT::DecodeError => error
  #   nil
  # end

  def current_profile
    # Screw it, always pretend to be profile #1
    # return Profile.find(1)
  
    # If we have a current profile, just return it
    @current_profile ||= begin
      token = request.headers["Authorization"].to_s.split(" ").last
      payload, header = *JSONWebToken.verify(token)
  
      # Use the existing current_profile instance variable, *OR* go find it from the database
      Profile.from_auth_hash(payload)
    end
  rescue JWT::VerificationError, JWT::DecodeError
    nil
  end
end

