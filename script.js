
const alerts = [
    {
        "id": "6049dbd2-45bc-4e34-9ea2-c82ced0279f1",
        "alert_type": "Unsafe driving",
        "vehicle_id": "cc70a7e5-8397-4914-bbbb-4d6bb521ec67",
        "driver_friendly_name": "Ramesh",
        "vehicle_friendly_name": "KA12A3456",
        "timestamp": "2023-03-01T04:25:45.424Z"
    },
    {
        "id": "5149dbd2-45bc-4e34-9ea2-c82ced0279f1",
        "alert_type": "Distracted driver",
        "vehicle_id": "dd70a7e5-8397-4914-bbbb-4d6bb521ec67",
        "driver_friendly_name": "Suresh",
        "vehicle_friendly_name": "MH12A3456",
        "timestamp": "2023-03-01T04:24:45.424Z"
    },
    {
        "id": "5149dbd2-45bc-4e34-9ea2-c62ced0279f1",
        "alert_type": "Distracted driver",
        "vehicle_id": "dd70a7e5-8397-4914-bbbb-4d6bb521ec67",
        "driver_friendly_name": "Nikhil",
        "vehicle_friendly_name": "MQ12A3456",
        "timestamp": "2023-03-03T04:24:45.424Z"
    },
  ];
  
  document.addEventListener('DOMContentLoaded', function () {
    const alertsContainer = document.getElementById('alerts-container');
    const vehicleDropdown = document.getElementById('vehicle-search');
    const freeTextSearch = document.getElementById('free-text-search');
    renderAlerts(alerts);
    freeTextSearch.addEventListener('input', function () {
      const filteredAlerts = filterAlerts();
      renderAlerts(filteredAlerts);
    });
    vehicleDropdown.addEventListener('change', function () {
        const filteredAlerts = filterAlerts();
        renderAlerts(filteredAlerts);
      });
    populateVehicleDropdown();
  });
  
  

function filterAlerts() {
    const freeText = document.getElementById('free-text-search').value.toLowerCase();
    const vehicleNumber = document.getElementById('vehicle-search').value.toLowerCase();
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);

    console.log('Free Text:', freeText);
    console.log('Vehicle Number:', vehicleNumber);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);

    return alerts.filter(alert =>
        (freeText === '' ||
            alert.alert_type.toLowerCase().includes(freeText) ||
            alert.driver_friendly_name.toLowerCase().includes(freeText) ||
            alert.vehicle_friendly_name.toLowerCase().includes(freeText)) &&
        (vehicleNumber === '' || alert.vehicle_friendly_name.toLowerCase().includes(vehicleNumber)) &&
        (isNaN(startDate.getTime()) || new Date(alert.timestamp) >= startDate) &&
        (isNaN(endDate.getTime()) || new Date(alert.timestamp) <= endDate)
    );
}
 
  function renderAlerts(filteredAlerts) {
    const alertsContainer = document.getElementById('alerts-container');
    alertsContainer.innerHTML = '';
  
    filteredAlerts.forEach(alert => {
      const alertElement = document.createElement('div');
      alertElement.className = 'alert';
      alertElement.innerHTML = `
        <p>${alert.alert_type}</p>
        <p>Driver: ${alert.driver_friendly_name}</p>
        <p>Vehicle: ${alert.vehicle_friendly_name}</p>
        <p>Timestamp: ${alert.timestamp}</p>
        <button onclick="markAsFalseAlarm('${alert.id}')">Mark as False Alarm</button>
      `;
      alertsContainer.appendChild(alertElement);
    });
  }
  
  function markAsFalseAlarm(alertId) {
    const alertIndex = alerts.findIndex(alert => alert.id === alertId);
    if (alertIndex !== -1) {
      alerts[alertIndex].falseAlarm = true;
      renderAlerts(alerts);
    }
  }
  
function populateVehicleDropdown() {
   
    const vehicleDropdown = document.getElementById('vehicle-search');
    
    vehicleDropdown.innerHTML = '';
  
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = 'Select Vehicle';
    vehicleDropdown.appendChild(placeholderOption);
    
    const uniqueVehicleNumbers = [...new Set(alerts.map(alert => alert.vehicle_friendly_name))];

    uniqueVehicleNumbers.forEach(vehicleNumber => {
      const option = document.createElement('option');
      option.value = vehicleNumber;
      option.textContent = vehicleNumber;
      vehicleDropdown.appendChild(option);
    });
  }
 

  
  
  
