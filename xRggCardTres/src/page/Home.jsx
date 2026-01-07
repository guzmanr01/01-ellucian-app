import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20, spacing50, spacing60 } from '@ellucian/react-design-system/core/styles/tokens';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Pagination,
    TableFooter, 
    CircularProgress,
    TableHead, 
    Card, CardHeader, CardContent,
    List, ListItem, ListItemIcon, Icon, ListItemText,
    Divider, Button,Alert, INLINE_VARIANT,
} from '@ellucian/react-design-system/core';
import { useCardInfo, useData, usePageControl } from '@ellucian/experience-extension-utils';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchStudentAcademicInfo } from '../data/student-information';
import classNames from 'classnames';

const styles = (theme) => ({
    card: {
        margin: `0 ${spacing20}`
    },
    check: {
        color: theme.palette.status.success.text,
    },
    hourGlass: {
        color: theme.palette.grey['500']
    },
    icon: {
        alignSelf: 'flex-start',
    },
    listArea: {
        backgroundColor: theme.palette.grey['200'],
        maxWidth: theme.spacing(100),
        minWidth: theme.spacing(50),
        padding: spacing60,
    },
    inline: {
        marginTop: spacing60,
    },
    inlineAlert: {
        marginBottom: spacing50,
    }
});

const HomePage = (props) => {
    const { classes } = props;
    const { setPageTitle } = usePageControl();

    const { cardConfiguration: {
            getAcademicInfoPipeline
        }, 
        cardId 
    } = useCardInfo();

    const { authenticatedEthosFetch } = useData();
    const { id } = useParams();    
    const [academicData, setAcademicData] = useState();    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
            
    // eslint-disable-next-line no-unused-vars
    const [emptyRows, setEmptyRows] = useState(0);


    setPageTitle('Informacion Academica');
    const handleChangePage = (event, page) => {
        setPage( page );
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(event.target.value );
    };
    
    const [openPersistent] = useState(true);
    // const alertText = 'Pending changes are awaiting approval. You may cancel the update anytime';
    const errorText = 'Usuario sin correos asociados.';
    // const customId = 'AlertInlineExample';


    const getPipelineStudentData = async() => {

        try {
            
            const response = await fetchStudentAcademicInfo({ authenticatedEthosFetch, cardId, studentAcademicInfoPipeline: getAcademicInfoPipeline });
            console.log({response});
            setAcademicData(response.data);
            // setRowsPerPage( [academicData.academicInfo].length );
            // setEmptyRows( rowsPerPage - Math.min(rowsPerPage, [academicData.academicInfo].length - page * rowsPerPage));
            // setEmptyRows(0);

            // setRowsPerPage( [academicData.academicInfo].length )
            // setEmptyRows( rowsPerPage - Math.min(rowsPerPage, [academicData.academicInfo].length - page * rowsPerPage))
        } catch (error) {
            console.error(`Error: al ejecutar el pipeline: ${error}`);
        }
    }

    useEffect(() => {
        getPipelineStudentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]); // id

    return (
        <div className={classes.card}>

            {
                academicData ? 
                <>                    
                    <Paper className={classes.root}>
                        <div className={classes.tableWrapper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Student Id</TableCell>
                                        <TableCell align="right">Name</TableCell>
                                        <TableCell align="right">Programs</TableCell>
                                        <TableCell align="right">Campus</TableCell>
                                        <TableCell align="right">Level</TableCell>
                                        <TableCell align="right">Terms</TableCell>
                                    </TableRow>
                                </TableHead>
                                    <TableBody>
                                        {academicData.academicInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(dato => {
                                            return (
                                                <TableRow key={academicData.id}>
                                                    <TableCell >{academicData.idAlumno}</TableCell>
                                                    <TableCell align="left">{academicData.name}</TableCell>
                                                    <TableCell align="left">{dato.program} - {dato.programDesc}</TableCell>
                                                    <TableCell align="left">{dato.campCode} - {dato.campDesc}</TableCell>
                                                    <TableCell align="left">{dato.levlCode} - {dato.levlDesc}</TableCell>
                                                    <TableCell align="left">{dato.termCode} - {dato.termDesc}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 48 * emptyRows }}>
                                                <TableCell colSpan={2} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                        <TableFooter>
                                            <TableRow aria-hidden={true}>
                                                <Pagination
                                                    count={academicData.academicInfo.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                />
                                            </TableRow>
                                        </TableFooter>
                            </Table>
                        </div>
                    </Paper>


                    {
                        academicData.email ?
                        <>
                            <Divider id={`emails_MiddleExample`} variant={'middle'} />

                            <Card
                                className={classes.card}
                                id={`Emails_Card0`}
                                accent={'primary'}
                            >
                                <CardHeader title={'Correos del Estudiante'}/>
                                <CardContent id={`Emails_CardContent0`}>
                                    {
                                        academicData.email.length > 0 ? 
                                        <>
                                            <List>
                                            {
                                                academicData.email.map(email => {

                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <Icon
                                                                name="email"
                                                                className={classNames(classes.check, classes.icon)}
                                                                large
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={ email.address }
                                                            secondary={ email.id }
                                                        />
                                                    </ListItem>

                                                })
                                            }
                                        </List>
                                        </>
                                        :
                                        <>
                                            <Alert
                                                alertType="error"
                                                className={classes.inlineAlert}
                                                open={openPersistent}
                                                userDismissable={false}
                                                text={errorText}
                                                variant={INLINE_VARIANT}
                                            />
                                        </>
                                    }
                                    <Divider id={`emails_MiddleExample`} variant={'middle'} />
                                    <Button id={`emailbutton_FluidSecondaryButton`} fluid color="secondary" className={classes.button}>
                                        Agregar Correo
                                    </Button>
                                </CardContent>
                            </Card>
                        </> 
                        : 
                        <CircularProgress aria-valuetext="Cargandooo..." />
                        
                    }
                </>

                :

                <>
                    <CircularProgress aria-valuetext="Cargandooo..." />
                </>
            }


        </div>
    );
};

HomePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);