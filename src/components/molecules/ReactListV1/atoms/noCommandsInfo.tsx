
import * as React from 'react';

export const NoCommandsInfo = <div>
  <h2>This pane is for optional command buttons</h2>
  <p>Currently there are no commands set up but.....</p>
  <p>Command buttons can be created to make simple item changes like: 
      <ol >
          <li>Set status to Complete</li>
          <li>{escape(`Put today's date in Completed Date column`)}</li>
          <li>{escape(`Add current user's name into Completed By column`)}</li>
      </ol>
  </p>
  <p>You can find out more about quick commands here by Editing the web part and pressing the yellow button in the banner {`:)`}</p>
</div>;