import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20} from '@ellucian/react-design-system/core/styles/tokens';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useCardInfo, useData, usePageControl, useUserInfo } from '@ellucian/experience-extension-utils';
import { Pagination, Table, TableHead, TableBody, TableCell, TableRow, TableFooter, Divider, Button, CircularProgress} from '@ellucian/react-design-system/core';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useIntl } from 'react-intl';
import { withIntl } from '../Utils/ReactIntlProviderWrapper';
import { fetchStudentAcademicInfo } from '../data/student-information';


const styles = () => ({
    card: {
        margin: `0 ${spacing20}`
    },
    table: {
        minWidth: '31.250rem',
    }
});

const HomePage = (props) => {
    const { classes, data: { getEthosQuery } } = props;
    const { setPageTitle } = usePageControl();
    const { siteId } = useParams();
    const [ buildings, setBuildings] = useState();
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const intl = useIntl();
    const { firstName } = useUserInfo();    

    const customId = 'Divider'
    setPageTitle('Props and Hooks');

    const { cardConfiguration: { studentAcademicInfoPipeline }, cardId } = useCardInfo();
    // eslint-disable-next-line no-unused-vars
    const [studentInformation, setStudentInformation] = useState();
    const { authenticatedEthosFetch } = useData();

    const [loadingDataStudent, setLoadingDataStudent] = useState(false);

    const getBuildingsData = async () => {
        try {
            const result = await getEthosQuery({  queryId: 'buildings-list', properties: { 'siteId': siteId } });
            const tmpBuildings = result?.data?.buildings?.edges?.map( dato => dato.node ) || [];
            
            setBuildings(tmpBuildings);            
            console.log(`Roberto GG | tmpBuildings`, buildings);
        } catch (error) {
            console.error('Error fetching sites data:', error);
        }
    };

    useEffect(() => {
        getBuildingsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [siteId]);
    
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (e) => {
        const next = Number(e.target.value);
        setRowsPerPage(next);
        setPage(0);
    };

    const handleGetInformation = useCallback(async() => {
        try {
            setLoadingDataStudent(true);
            const result = await fetchStudentAcademicInfo({ authenticatedEthosFetch, cardId, studentAcademicInfoPipeline });
            // const result = await fetchStudentAcademicInfo( authenticatedEthosFetch, cardId, studentAcademicInfoPipeline);
            setStudentInformation( result.data );
            setLoadingDataStudent(false);
        } catch (error) {
            // console.log(error);
            console.log(`${intl.formatMessage({id: 'MSG-001'})}`, error);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.card}>
            <h1>Card: { siteId }</h1>
            <p>{intl.formatMessage({id: 'MSG-007'}) +  firstName + intl.formatMessage({id: 'MSG-008'})}</p>
            { buildings 
                ?   <>
                <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>{ intl.formatMessage( { id: "MSG-004" } ) }</TableCell>
                                <TableCell>{ intl.formatMessage( { id: "MSG-005" } ) }</TableCell>
                                <TableCell>{ intl.formatMessage( { id: "MSG-006" } ) }</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {buildings.map(n => {
                                return (
                                    <TableRow key={n.id}>
                                        <TableCell>{n.site.code} - {n.site.title} </TableCell>
                                        <TableCell>{n.code}</TableCell>
                                        <TableCell>{`${n.title}`}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow aria-hidden={true}>
                                <Pagination
                                    count={buildings.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>

                    
                    

                    </>
                :   <h1>Cargando datosss...</h1>
            }


            {/*  */}


            <Divider id={`${customId}_MiddleExample`} variant={'middle'} />

                    <Button 
                        id={`${customId}_SecondaryButton`} 
                        color="secondary" 
                        size={'default'}  
                        className={classes.Button} 
                        onClick={handleGetInformation}
                    >Informaci&oacute;n acad&eacute;mica</Button>

            {/* tabla ------------------------------------------------------------------------ */}

            { studentInformation ? 
                (
            <Table stickyHeader className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Estudiante</TableCell>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Periodo</TableCell>
                            <TableCell align="right">Plan estudio</TableCell>
                            <TableCell align="right">Estado</TableCell>
                            <TableCell align="right">Programa</TableCell>
                            <TableCell align="right">DESC programa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentInformation.academicInfo.map( student => {
                            return (
                                <TableRow key={student.id}>
                                    <TableCell>
                                            {studentInformation.idAlumno}
                                    </TableCell>
                                    <TableCell align="right">
                                        {studentInformation.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        { student.termCode }
                                    </TableCell>
                                    <TableCell align="right">
                                        { student.keySeqno }
                                    </TableCell>
                                    <TableCell align="right">
                                        { student.cactCode }
                                    </TableCell>
                                    <TableCell align="right">
                                        { student.program }
                                    </TableCell>
                                    <TableCell align="right">
                                        { student.programDesc }
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>                
                ) 
                :
                (<>

                    { loadingDataStudent && 
                        <>
                        <h3>Obteniendo datos...</h3>
                        <CircularProgress />
                        </>
                    }
                
                </>)
            }





        </div>
    );

};

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,    
};

export default withIntl( withStyles(styles)(HomePage) );