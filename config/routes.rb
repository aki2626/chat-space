Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users, only: [:edit, :update] 
  resources :groups, only: [:new, :create, :edit, :update, :index]
  resources :groups do
    resources :users do
      resources :messages, only: [:create]
    end 
  end 
end
