import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing30, spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableExpandableRow,
    Button,
    responsiveViewport
} from '@ellucian/react-design-system/core';

const styles = () => ({
    card: {
        marginTop: 0,
        marginRight: spacing40,
        marginBottom: 0,
        marginLeft: spacing40
    },
    table: {
        margin: spacing30,
    }
});

const XPspFirstCardCard = (props) => {
    const { classes, data:{ getEthosQuery } } = props;
    const [ sites, setSites ] = useState();

    const getSitesData = async() => {

        try {
            
            const result = await getEthosQuery( { queryId: 'sites-list'});
            console.log( "result", result );
            const tmpSites = result?.data?.sites?.edges?.map( site => site.node ) || [];
            console.log( "sites", sites );
            setSites( tmpSites );

        } catch (error) {
            console.log('Error fetching sites data:', error );
        }
    };

    useEffect(() =>{
        getSitesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sites]);

    const layoutProp = {
        variant: 'expansionPanels',
        breakpoint: responsiveViewport !== 'none' ? responsiveViewport : '',
    };

    return (
        <div className={classes.card}>
            { sites 
                ?   <Table className={classes.table} layout={layoutProp} >
                        <TableHead>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Acciones</TableCell>
                                {/* Empty TableCell to account for the spacing needed for ExpandableTableRow icosite. */}
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sites.map((site) => {
                                return (
                                    <TableExpandableRow
                                        key={site.id}
                                        expandedRowContent={site.title}
                                    >
                                        <TableCell component="th" scope="row" columnName="Código">
                                            <span>{site.code}</span>
                                        </TableCell>
                                        <TableCell columnName="Descripción"><span>{site.title}</span></TableCell>
                                        <TableCell columnName="Acciones">
                                            <Button 
                                                variant="text" 
                                                tabIndex={0} 
                                                aria-label={`Ver ${ site.code }`}
                                            >Add
                                            </Button>
                                        </TableCell>
                                    </TableExpandableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                :   'Cargando...'
            }
        </div>
    );
};

XPspFirstCardCard.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(XPspFirstCardCard);