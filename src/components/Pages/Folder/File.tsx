import { Card, Dropdown, DropdownButton } from 'react-bootstrap';

export const File = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>File name</Card.Title>  
          <DropdownButton
            id="dropdown-button-dark-example2"
            title="Actions"
            className="mt-2 w-100"
            variant='outline-primary'
          >
            <Dropdown.Item href="#/action-1" active>
              Action
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
          </DropdownButton>
        </Card.Body>  
      </Card> 
    </>
  );
}