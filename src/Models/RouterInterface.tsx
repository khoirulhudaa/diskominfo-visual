export interface RouterInterface {
    path: string,
    exact: boolean,
    component: React.FC<{}> 
}