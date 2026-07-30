import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette:{

        mode:"dark",

        primary:{

            main:"#1976d2"

        },

        secondary:{

            main:"#26c6da"

        },

        background:{

            default:"#0f172a",

            paper:"#1e293b"

        }

    },

    shape:{

        borderRadius:16

    },

    typography:{

        fontFamily:"Poppins"

    }

});

export default theme;