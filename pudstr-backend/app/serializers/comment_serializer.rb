class CommentSerializer < ActiveModel::Serializer
  attributes :id, :title, :text, :rating, :user_id
end
