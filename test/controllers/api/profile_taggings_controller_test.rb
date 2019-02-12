require 'test_helper'

class Api::ProfileTaggingsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_profile_taggings_index_url
    assert_response :success
  end

end
