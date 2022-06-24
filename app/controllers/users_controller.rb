class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_record

    def create
        user = User.create(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end
    def show
        user = User.find(session[:user_id])
        # byebug
        
        render json: user, status: :ok
    rescue
        render json: {errors: "Not authorized"}, status: :unauthorized
    end

    private

    def user_params
        params.permit(:username, :password,:password_confirmation)
    end
    def render_invalid_record(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
    def render_record_not_found
        render json: {errors: "User not found"}, states: :not_found
    end
end
