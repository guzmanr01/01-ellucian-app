import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { 
    Typography, 
    // TextLink, 
    Divider, Button, CircularProgress } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useCardControl, useData, useUserInfo } from '@ellucian/experience-extension-utils';

const styles = () => ({
    card: {
        marginTop: 0,
        marginRight: spacing40,
        marginBottom: 0,
        marginLeft: spacing40
    }
});
const customId = 'Divider';

const XRggCardTresCard = (props) => {
    const { classes } = props;

    const { getEthosQuery } = useData();
    const userInfo = useUserInfo();
    const personGuid = userInfo.roles[(userInfo.roles).length -1];
    
    const [personData, setPersonData] = useState()

    const { navigateToPage } = useCardControl();
    // console.log(userInfo.roles);
    // console.log(`personGuid: `, personGuid);

    const getPersonData = async() => {
        try{
            const result = await getEthosQuery({
                queryId: 'person-data',
                properties: {
                    'personId': personGuid
                }
            });

            const personInfo = result.data.persons.edges.map(data => data.node);
            setPersonData( personInfo );

        } catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        getPersonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleClick = ( id ) => {
        console.log('click', id);
        navigateToPage({
            route: `/${id}`
        });
    }
    
    return (
        <div className={classes.card}>
            {
                personData ? 
                <>
                    <Typography variant="h2" align="center">
                        {personData[0].names[0].fullName}
                    </Typography>

                    <Divider id={`${customId}_MiddleExample`} variant={'middle'} />

                    <Button id={`${customId}_FluidSecondaryButton`} fluid color="secondary" className={classes.button}
                        onClick={() => handleClick(personData[0].id) }
                        // personGuid
                    >
                        Ver Detalle
                    </Button>

                </>
                : 
                <> 
                    <CircularProgress aria-valuetext="Cargandooo..." />
                </>
            }
        </div>
    );
};

XRggCardTresCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(XRggCardTresCard);