Rails.application.routes.draw do
  resources :books
  resources :authors, only: [:index]
  resources :tags, only: [:index]

  resources :contact_messages, only: [:create, :new]
  devise_for :users, :skip => [:registrations]                                          
  as :user do
    get 'users/sign_up' => 'devise/registrations#new', :as => 'new_user_registration'    
    post 'users' => 'devise/registrations#create', :as => 'user_registration'
    delete 'users' => 'devise/registrations#destroy', :as => 'destroy_user_registration'
  end

  devise_scope :user do
    authenticated :user do
      root 'home#index', as: :authenticated_root
    end

    unauthenticated :user do
      root 'home#landing'
    end
  end

  namespace :settings do
    resource :passwords, only: [:edit, :update]
    resource :accounts, only: [:edit, :update]
    resource :avatars, only: [:update]
  end

  get '/home', to: 'home#index', as: :home
  get '/explore', to: 'home#explore', as: :explore
  get '/privacy', to: 'home#privacy'
  get '/terms', to: 'home#terms'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
