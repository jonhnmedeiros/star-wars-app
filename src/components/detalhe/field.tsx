import { Accordion, AccordionDetails, AccordionSummary, Grid } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from 'react';

interface FieldProps {
  nome: string,
  valor: string
}

export const Field = (props:FieldProps) => {
  const {nome,valor} = props;

  return (
    <Grid item xs={12}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
            aria-controls='panel1a-content'
            id="panel1a-header">

        </AccordionSummary>
        <AccordionDetails>

        </AccordionDetails>
      </Accordion>
    </Grid>
  )
}