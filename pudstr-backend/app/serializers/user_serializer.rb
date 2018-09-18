class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :points, :favorites
end
