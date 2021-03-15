import { Box, Button, Collapsible, Form } from 'grommet';
import { Add } from 'grommet-icons';
import React, { useState } from 'react';
import { DynamicForm } from '../../../../dynamic-form/dynamic-form';
import { Container } from '../../../../reusable/container';
import { newFieldForm } from '../edit-model.variables';

export const AddFieldForm = ({ onSubmit: _onSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const onSubmit = () => {
    setShowForm(false);
    _onSubmit();
  };

  return (
    <>
      <Box margin={{ vertical: 'large' }} alignContent="center">
        <Button
          style={{ textAlign: 'center' }}
          icon={<Add />}
          size="small"
          onClick={() => setShowForm(!showForm)}
        />
      </Box>

      <Collapsible direction="vertical" open={showForm}>
        <Container>
          <Form onSubmit={onSubmit}>
            <DynamicForm fields={newFieldForm} />
            <Button type="submit" label="Add Field" />
          </Form>
        </Container>

        {/* {options.length ? (
          <Container>
            <h1>Options</h1>
            {options.map(({ value, label }) => (
              <>
                {label}: {value}
              </>
            ))}
          </Container>
        ) : null} */}
      </Collapsible>
    </>
  );
};
