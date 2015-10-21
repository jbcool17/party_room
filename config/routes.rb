Rails.application.routes.draw do
  root :to => 'pages#home'
  get '/cubeworld' => 'pages#cubeworld'
  get '/hyperdrive' => 'pages#hyperdrive'
  resources :pages
end
