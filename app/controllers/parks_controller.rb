class ParksController < ApplicationController
# http://localhost:3000/parks?user_id=1
# http://localhost:3000/users/2/parks
    def index
        if params[:user_id]
            user = User.find(params[:user_id])
            parks = user.parks.uniq
            render json: parks, each_serializer: ParkCardSerializer
        else
            parks =Park.limit(params[:limit]).offset(params[:start])
            render json: parks, each_serializer: ParkCardSerializer
        end
    end
    def show
        park = Park.find_by(id: params[:id])
        render json: park, include: ["images", "comments", "comments.user"]
    end
    def users_index
        user = User.find(session[:user_id])
        parks = user.parks.uniq
        render json: parks, each_serializer: ParkCardSerializer
    end

end
