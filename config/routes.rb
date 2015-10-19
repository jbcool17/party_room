Rails.application.routes.draw do
  root :to => 'pages#home'
  get '/cubeworld' => 'pages#cubeworld'
  resources :pages
end
