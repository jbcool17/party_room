Rails.application.routes.draw do
  root :to => 'pages#home'
  get '/cubeworld' => 'pages#cubeworld'
  get '/hyperdrive' => 'pages#hyperdrive'
  get '/ballroom' => 'pages#ballroom'
  get '/physicsroom' => 'pages#physicsroom'
  get '/cubeforest' => 'pages#cubeforest'
  resources :pages
end
