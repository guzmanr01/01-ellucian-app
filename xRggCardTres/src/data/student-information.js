export async function fetchStudentAcademicInfo( { authenticatedEthosFetch, cardId, studentAcademicInfoPipeline } ){


    console.log({ authenticatedEthosFetch, cardId, studentAcademicInfoPipeline });

    const urlSearchParameters = new URLSearchParams({
        cardId
    }).toString();
    const resourcePath = `${studentAcademicInfoPipeline}?${urlSearchParameters}`;

    const response = await authenticatedEthosFetch( resourcePath, {
        method: 'GET',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    }); 

    let result = {};
    let data = {};

    if(response){
        switch (response.status) {
            case 200:
                data = await response.json();
                result = {
                    data,
                    status: 'success'
                } 
                break;
        
            default:
                result = {
                    error:{
                        message: 'Error ttrying to retrieve information.',
                        statusCode: response.status
                    }
                }
        }
    }

    return result;
}