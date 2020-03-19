FactoryBot.define do
  factory :message do
    content         {Faker::Lorem.sentence}
    image           {File.open("#{Rails.root}/public/images/test_image.jpg")}
    group        
    user        
    created_at { Faker::Time.between(from: DateTime.now - 2, to: DateTime.now)} 
  end
end