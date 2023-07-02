Feature: Search a course
    Scenario: Should search by text
        Given user is on "/navigation" page
        When user search by "тестировщик"
        Then user sees the course suggested "Тестировщик ПО"
    
    Scenario: Open reservation on chosen date and time
        Given I am on the reservation page "/index.php"
        When I select the date "Пн"
        When I select the time "15:00"
        Then I should see the movie title "Терминатор-заржавел" и "Начало сеанса: 15:00"
    
    Scenario: Get e-ticket
        Given I am on the reservation page "/index.php"
        When I select the date "Пн"
        When I select the time "16:00"
        And I choose a seat "5" and click забронировать
        Then I should see the e-ticket "Вы выбрали билеты:"        
    
    Scenario: Selecting an already booked seat
        Given I am on the reservation page "/index.php"
        When I select the date "Пн"
        When I select the time "15:00"
        And I choose a seat "0" and click забронировать
        Then Selector Забронировать is not clickable
        