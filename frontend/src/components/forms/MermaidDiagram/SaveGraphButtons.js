import { Button } from "@mui/material";

export const SaveGraphButtons = ({ isReportPage, saveDiagram, exportAsPNG,exportAsSVG }) => {
    return (
        <>

        {isReportPage &&         
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={saveDiagram}
          style={{ marginLeft: '10px' }}
        >
          Add to Report
        </Button>}


        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={exportAsPNG}
          style={{ marginLeft: '10px' }}
        >
          Download PNG Diagram
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={exportAsSVG}
          style={{ marginLeft: '10px' }}
        >
          Download SVG Diagram
        </Button>
      </>
    );
  }