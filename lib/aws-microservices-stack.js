"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsMicroservicesStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const apigateway_1 = require("./apigateway");
const database_1 = require("./database");
const eventbus_1 = require("./eventbus");
const microservice_1 = require("./microservice");
const queue_1 = require("./queue");
class AwsMicroservicesStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const database = new database_1.SwnDatabase(this, 'Database');
        const microservices = new microservice_1.SwnMicroservices(this, 'Microservices', {
            productTable: database.productTable,
            basketTable: database.basketTable,
            orderTable: database.orderTable
        });
        const apigateway = new apigateway_1.SwnApiGateway(this, 'ApiGateway', {
            productMicroservice: microservices.productMicroservice,
            basketMicroservice: microservices.basketMicroservice,
            orderingMicroservices: microservices.orderingMicroservice
        });
        const queue = new queue_1.SwnQueue(this, 'Queue', {
            consumer: microservices.orderingMicroservice
        });
        const eventbus = new eventbus_1.SwnEventBus(this, 'EventBus', {
            publisherFuntion: microservices.basketMicroservice,
            targetQueue: queue.orderQueue
        });
    }
}
exports.AwsMicroservicesStack = AwsMicroservicesStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLW1pY3Jvc2VydmljZXMtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhd3MtbWljcm9zZXJ2aWNlcy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBZ0Q7QUFFaEQsNkNBQTZDO0FBQzdDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMsaURBQWtEO0FBQ2xELG1DQUFtQztBQUVuQyxNQUFhLHFCQUFzQixTQUFRLG1CQUFLO0lBQzlDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxzQkFBVyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVuRCxNQUFNLGFBQWEsR0FBRyxJQUFJLCtCQUFnQixDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDaEUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxZQUFZO1lBQ25DLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVztZQUNqQyxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7U0FDaEMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsSUFBSSwwQkFBYSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDdkQsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLG1CQUFtQjtZQUN0RCxrQkFBa0IsRUFBRSxhQUFhLENBQUMsa0JBQWtCO1lBQ3BELHFCQUFxQixFQUFFLGFBQWEsQ0FBQyxvQkFBb0I7U0FDMUQsQ0FBQyxDQUFDO1FBRUgsTUFBTSxLQUFLLEdBQUcsSUFBSSxnQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDeEMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxvQkFBb0I7U0FDN0MsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsSUFBSSxzQkFBVyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDakQsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLGtCQUFrQjtZQUNsRCxXQUFXLEVBQUUsS0FBSyxDQUFDLFVBQVU7U0FDOUIsQ0FBQyxDQUFDO0lBRUwsQ0FBQztDQUNGO0FBNUJELHNEQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBTd25BcGlHYXRld2F5IH0gZnJvbSAnLi9hcGlnYXRld2F5JztcbmltcG9ydCB7IFN3bkRhdGFiYXNlIH0gZnJvbSAnLi9kYXRhYmFzZSc7XG5pbXBvcnQgeyBTd25FdmVudEJ1cyB9IGZyb20gJy4vZXZlbnRidXMnO1xuaW1wb3J0IHsgU3duTWljcm9zZXJ2aWNlcyB9IGZyb20gJy4vbWljcm9zZXJ2aWNlJztcbmltcG9ydCB7IFN3blF1ZXVlIH0gZnJvbSAnLi9xdWV1ZSc7XG5cbmV4cG9ydCBjbGFzcyBBd3NNaWNyb3NlcnZpY2VzU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgZGF0YWJhc2UgPSBuZXcgU3duRGF0YWJhc2UodGhpcywgJ0RhdGFiYXNlJyk7ICAgIFxuXG4gICAgY29uc3QgbWljcm9zZXJ2aWNlcyA9IG5ldyBTd25NaWNyb3NlcnZpY2VzKHRoaXMsICdNaWNyb3NlcnZpY2VzJywge1xuICAgICAgcHJvZHVjdFRhYmxlOiBkYXRhYmFzZS5wcm9kdWN0VGFibGUsXG4gICAgICBiYXNrZXRUYWJsZTogZGF0YWJhc2UuYmFza2V0VGFibGUsXG4gICAgICBvcmRlclRhYmxlOiBkYXRhYmFzZS5vcmRlclRhYmxlXG4gICAgfSk7XG5cbiAgICBjb25zdCBhcGlnYXRld2F5ID0gbmV3IFN3bkFwaUdhdGV3YXkodGhpcywgJ0FwaUdhdGV3YXknLCB7XG4gICAgICBwcm9kdWN0TWljcm9zZXJ2aWNlOiBtaWNyb3NlcnZpY2VzLnByb2R1Y3RNaWNyb3NlcnZpY2UsXG4gICAgICBiYXNrZXRNaWNyb3NlcnZpY2U6IG1pY3Jvc2VydmljZXMuYmFza2V0TWljcm9zZXJ2aWNlLFxuICAgICAgb3JkZXJpbmdNaWNyb3NlcnZpY2VzOiBtaWNyb3NlcnZpY2VzLm9yZGVyaW5nTWljcm9zZXJ2aWNlXG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgcXVldWUgPSBuZXcgU3duUXVldWUodGhpcywgJ1F1ZXVlJywge1xuICAgICAgY29uc3VtZXI6IG1pY3Jvc2VydmljZXMub3JkZXJpbmdNaWNyb3NlcnZpY2VcbiAgICB9KTtcblxuICAgIGNvbnN0IGV2ZW50YnVzID0gbmV3IFN3bkV2ZW50QnVzKHRoaXMsICdFdmVudEJ1cycsIHtcbiAgICAgIHB1Ymxpc2hlckZ1bnRpb246IG1pY3Jvc2VydmljZXMuYmFza2V0TWljcm9zZXJ2aWNlLFxuICAgICAgdGFyZ2V0UXVldWU6IHF1ZXVlLm9yZGVyUXVldWUgICBcbiAgICB9KTsgICBcblxuICB9XG59XG4iXX0=