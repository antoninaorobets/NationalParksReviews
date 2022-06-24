class CommentsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_no_record_responce
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_record_responce

    def index
        park = find_park
        comments = park.comments
        render json: comments, status: :ok
    end
    def show
        park = find_park
        comment = park.comments.find(params[:id])
        render json: comment, status: :ok
    end
    def create
        park = find_park
        comment = park.comments.create!(comment_params)
        render json: comment, status: :created
    end
    def update
        park = find_park
        comment = park.comments.find(params[:id])
        comment.update(text: params[:text])
        render json: comment, status: :ok
    end
    def destroy
        park = find_park
        comment = park.comments.find(params[:id])
        comment.destroy
        head :no_content
    end

    private
    def comment_params
        params.permit(:text, :user_id, :park_id)
    end
    def find_park
        Park.find(params[:park_id])
    end
    def render_no_record_responce
        render json: {errors: "No record found"}, status: :not_found
    end
    def render_invalid_record_responce invalid
        render json: {errors: invalid.record.errors.full_messeges}, status: :unprocessable_entity 
    end
end
