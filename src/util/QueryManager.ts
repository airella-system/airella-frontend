import useLocalStorage from 'react-use-localstorage';

const [authToken, setAuthToken] = useLocalStorage('auth-token', '');

enum RequestType {
    GET = "get", 
    POST = "post"
}

class EndpointsItem {
    url: string;
    method: RequestType;
    requireAuth: boolean;

    constructor(url: string, method: RequestType, requireAuth: boolean) {
        this.url = url;
        this.method = method;
        this.requireAuth = requireAuth;
    }
}

export class Endpoints {
    public static login = new EndpointsItem("accounts/login/", RequestType.POST, false);
}

export class QueryManager {
    private static baseURL = "http://127.0.0.1:8000/api/v1/";
    private static token = "";

    static getQueryExecutor(endpoint: EndpointsItem, dataToSend: any, propHistoryManager: any, config: any,  notifyManager: any) {
        let headersSet = new Map();
        headersSet.set("Authorization", "");

        if(config != null && 'raw' in config){
            // headersSet.set("Content-type", "application/x-www-form-urlencoded");
        }
        else {
            headersSet.set("Content-type", "application/json; charset=UTF-8");
        }

        let queryParameters = {};
        
        if(endpoint.requireAuth) {
            if(QueryManager.token === "") {
                QueryManager.token = "Token " + authToken;
            }

            headersSet.set("Authorization", QueryManager.token);
        }

        if(dataToSend === null) {
            queryParameters = {
                method: endpoint.method,
                headers: headersSet
            };
        }
        else {
            if(config != null && 'raw' in config){
                console.log("aaaa");
                queryParameters = {
                    method: endpoint.method,
                    headers: headersSet,
                    body: dataToSend
                }
            }
            else {
                queryParameters = {
                    method: endpoint.method,
                    headers: headersSet,
                    body: JSON.stringify(dataToSend)
                }
            }
        }
        
        if(endpoint.requireAuth) {
            return fetch(
                this.baseURL + endpoint.url, 
                queryParameters
            )
            .then(response => response.json())
            .then(data => {
                if(typeof data.detail !== undefined && data.detail === "Invalid token.") {
                    propHistoryManager.push('/login');
                }
                return data;
            });
        }
        else {
            return fetch(
                this.baseURL + endpoint.url, 
                queryParameters
            ).then(response => response.json());
        }

    }
}