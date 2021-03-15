import { Form, Button, Box, Collapsible } from 'grommet';
import { Add, Checkmark } from 'grommet-icons';
import React, { useState } from 'react';
import { DynamicForm } from '../../../../dynamic-form/dynamic-form';
import { Container } from '../../../../reusable/container';
import { optionsForm } from '../edit-model.variables';

export const AddOptionForm = ({ onSubmit: _onSubmit, name }) => {
  const [showForm, setShowForm] = useState(false);
  const onSubmit = () => {
    setShowForm(false);
    _onSubmit(name);
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
            <DynamicForm fields={optionsForm} />
            <Button type="submit" icon={<Checkmark />} />
          </Form>
        </Container>
      </Collapsible>
    </>
  );
};
