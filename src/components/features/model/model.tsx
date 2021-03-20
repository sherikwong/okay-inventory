import { Box, Button, Collapsible, DataTable, Form, Heading } from 'grommet';
import { Add } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { entriesDB } from '../../../database/entry';
import { modelsDB } from '../../../database/models';
import { IEntry } from '../../../models/entry';
import { IModel } from '../../../models/models';
import { navigateToPageID } from '../../../utils/goToPageByID';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { Container } from '../../reusable/container';
import NavBox from '../../reusable/NavBox/NavBox';
import { useExistingModel } from './edit/edit-model.utils';

export const Model = ({ match, history }) => {
  const modelID = match.params.id;
  const existingModel = useExistingModel(match);
  const [columnsFromDB, setColumnsFromDB] = useState<any[]>([]);
  const [showAddEntryForm, setShowAddEntryForm] = useState(false);
  const [data, setData] = useState<IEntry[]>([]);

  const mapColumns = (existingModel: IModel) => {
    if (existingModel) {
      const shallowModel = { ...existingModel };
      const dateColumn = shallowModel.fields['date'];

      if (dateColumn) {
        delete (shallowModel as any).fields.date;
      }

      const fieldsAsArray = Object.values(shallowModel.fields);
      const fieldsWithDateSorted = dateColumn
        ? [dateColumn, ...fieldsAsArray]
        : fieldsAsArray;

      const _columns = fieldsWithDateSorted.map(({ name, label }) => ({
        property: name,
        header: label,
      }));

      setColumnsFromDB(_columns);
    }
  };

  const getEntries = (existingModel: IModel) => {
    if (existingModel) {
      const allEntriesGetterPromise =
        existingModel.entries &&
        Object.values(existingModel.entries).map((entry) =>
          entriesDB.get(entry)
        );

      if (allEntriesGetterPromise) {
        Promise.all(allEntriesGetterPromise).then((items) => {
          setData(items);
        });
      }
    }
  };

  useEffect(() => {
    mapColumns(existingModel);
    getEntries(existingModel);
  }, [existingModel]);

  const onSubmit = ({ value }) => {
    if (Object.entries(value).length) {
      entriesDB.add({ ...value, modelID }).then((entry) => {
        modelsDB
          .update(match.params.id, {
            ...existingModel,
            entries: { ...existingModel.entries, [entry.id]: entry.id },
          })
          .then((res) => {
            setShowAddEntryForm(false);
          });
      });
    }
  };

  const onClickRow = ({ datum }) => {
    navigateToPageID(existingModel.pageID, datum.id, history);
  };

  return (
    <>
      <NavBox />
      <Box margin="medium">
        <Heading level={3} alignSelf="center">
          {existingModel?.name}
        </Heading>
        <DataTable
          columns={columnsFromDB}
          data={data}
          onClickRow={onClickRow}
        />
        <Box margin={{ vertical: 'large' }} alignContent="center">
          <Button
            style={{ textAlign: 'center' }}
            icon={<Add />}
            size="small"
            onClick={() => setShowAddEntryForm(!showAddEntryForm)}
          />
        </Box>

        <Collapsible direction="vertical" open={showAddEntryForm}>
          <Container>
            <Form onSubmit={onSubmit}>
              <DynamicForm fields={existingModel?.fields || []} />
              <Button type="submit" label="Add Field" />
            </Form>
          </Container>
        </Collapsible>
      </Box>
    </>
  );
};
