import type { NextPage } from "next";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { faqsData } from "dh-marvel/components/faqs/faqsData";
import { Box } from "@mui/system";

const Faqs: NextPage = () => {

  return (
    <Container maxWidth="xl">
    <h1>Preguntas frecuentes</h1>
    <Box maxWidth="xl">
    {faqsData.map((faq)=>
      <Accordion key={faq.id}>

        <AccordionSummary expandIcon={<ExpandMore />}>
          {faq.question}
        </AccordionSummary>

        <AccordionDetails>
          {faq.answer}
        </AccordionDetails>
        
      </Accordion>
    )
  }
  </Box>
  </Container>
   );
};

export default Faqs;
