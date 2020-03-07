import { datastore } from "./datastore";

export class CareerImprovementClientControllerLoader {
    fromInMemory(careerImprovementClient) {
        datastore().set(careerImprovementClient);
    }
};