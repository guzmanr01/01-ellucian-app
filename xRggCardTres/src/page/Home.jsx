import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
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
    CircularProgress
} from '@ellucian/react-design-system/core';
import { useCardInfo, useData, usePageControl } from '@ellucian/experience-extension-utils';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchStudentAcademicInfo } from '../data/student-information';
const styles = () => ({
    card: {
        margin: `0 ${spacing20}`
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
    // eslint-disable-next-line no-unused-vars
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [emptyRows, setEmptyRows] = useState();


    const [academicData, setAcademicData] = useState();
    setPageTitle('Informacion Academica');


    const getPipelineStudentData = async() => {

        try {
            
            const response = await fetchStudentAcademicInfo({ authenticatedEthosFetch, cardId, studentAcademicInfoPipeline: getAcademicInfoPipeline });
            console.log({response});
            setAcademicData(response.data);
            setRowsPerPage(0); //[academicData.academicInfo].length
            setEmptyRows(rowsPerPage - Math.min(rowsPerPage, [academicData.academicInfo].length - page * rowsPerPage));

        } catch (error) {
            console.error(error);
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
                                <TableBody>
                                    {academicData.academicInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                        return (
                                            <TableRow key={n.id}>
                                                <TableCell component="th" scope="row">
                                                    {n.name}
                                                </TableCell>
                                                <TableCell align="right">{n.calories}</TableCell>
                                                <TableCell align="right">{n.fat}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 48 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow aria-hidden={true}>
                                        <Pagination
                                            count={academicData.academicInfo.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={this.handleChangePage}
                                            onRowsPerPageChange={this.handleChangeRowsPerPage}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </Paper>
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