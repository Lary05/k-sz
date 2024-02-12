$(document).ready(() => {
    
    $('#cityNameFormGroup, #addCityBtn, #cityNameLabel').hide();
  
    
    $('#countySelect').change(() => {
      const selectedCounty = $('#countySelect').val();
  
      if (selectedCounty) {
        
        $('#cityNameFormGroup, #addCityBtn, #cityNameLabel').show();
  
        
        $.ajax({
          url: 'csvBeolvas.php',
          method: 'POST',
          data: { county: selectedCounty },
          dataType: 'json',
          success: response => {
            if (response.cities.length > 0) {
              let cityList = '<div class="city-list">';
              response.cities.forEach(city => {
                cityList += `<div class="city">${city}</div><div class="delete-container"><a href="#" class="btn btn-danger deleteBtn">Delete</a></div>`;
              });
              cityList += '</div>';
              $('#cityList').html(cityList).show();
  
              
              $('.deleteBtn').click(e => {
                e.preventDefault();
                const cityName = $(e.target).closest('.city').text().trim();
                console.log(`Delete button clicked for city: ${cityName}`);
  
                
                $.ajax({
                  url: 'csvBeolvas.php',
                  method: 'POST',
                  data: { county: selectedCounty, deleteCity: cityName },
                  dataType: 'json',
                  success: response => {
                    if (response.success) {
                      
                      $(e.target).closest('.city').remove();
                    } else {
                      alert('Error deleting city.');
                    }
                  }
                });
              });
            } else {
              $('#cityList').hide();
            }
  
            
            $('#countyImageContainer').html(`<img src="${response.countyImage}">`).show();
          }
        });
      } else {
        
        $('#cityNameFormGroup, #addCityBtn, #cityNameLabel').hide();
  
        
        $('#cityList, #countyImageContainer').hide();
      }
    });
  
    
    $('#addCityBtn').click(() => {
      const selectedCounty = $('#countySelect').val();
      const cityName = $('#cityName').val();
  
      
      $.ajax({
        url: 'csvBeolvas.php',
        method: 'POST',
        data: { county: selectedCounty, cityName },
        dataType: 'json',
        success: response => {
          if (response.success) {
            
            const newCity = `<div class="city">${cityName}</div><div class="delete-container"><a href="#" class="btn btn-danger deleteBtn">Delete</a></div>`;
            $('#cityList').append(newCity);
          } else {
            alert('Error adding city.');
          }
        }
      });
    });
  });