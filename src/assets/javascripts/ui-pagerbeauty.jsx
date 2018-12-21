// ------- Imports -------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';

// ------- Internal imports ----------------------------------------------------

import { SchedulesListView } from './views/ScheduleViews';
import { OnCallView } from './views/OnCallViews';
import { withAjaxBackend } from './ui-backend-drivers';

// ------- Program -------------------------------------------------------------

// Render schedules list
const schedulesListRoot = document.getElementById('schedules_list');
if (schedulesListRoot) {
  const SchedulesListWithBackend = withAjaxBackend({
    WrappedComponent: SchedulesListView,
    endpoint: '/v1/schedules.json',
  });

  ReactDOM.render(<SchedulesListWithBackend />, schedulesListRoot);
}

// Render individual schedules
document.querySelectorAll('.on_call_root').forEach((schedule) => {
  const OnCallWithBackend = withAjaxBackend({
    WrappedComponent: OnCallView,
    endpoint: `/v1/schedules/${schedule.dataset.id}.json`,
  });
  ReactDOM.render(<OnCallWithBackend />, schedule);
})

// Old-school refresh. To be replaced with React component states.
window.onload = function() {
  window.setTimeout(function() {
    location.reload();
  }, 3600 * 24 * 1000); // 1 day
}

// ------- End -----------------------------------------------------------------
