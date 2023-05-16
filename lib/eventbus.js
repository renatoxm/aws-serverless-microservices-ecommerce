"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwnEventBus = void 0;
const aws_events_1 = require("aws-cdk-lib/aws-events");
const aws_events_targets_1 = require("aws-cdk-lib/aws-events-targets");
const constructs_1 = require("constructs");
class SwnEventBus extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        //eventbus
        const bus = new aws_events_1.EventBus(this, 'SwnEventBus', {
            eventBusName: 'SwnEventBus'
        });
        const checkoutBasketRule = new aws_events_1.Rule(this, 'CheckoutBasketRule', {
            eventBus: bus,
            enabled: true,
            description: 'When Basket microservice checkout the basket',
            eventPattern: {
                source: ['com.swn.basket.checkoutbasket'],
                detailType: ['CheckoutBasket']
            },
            ruleName: 'CheckoutBasketRule'
        });
        // // need to pass target to Ordering Lambda service
        // checkoutBasketRule.addTarget(new LambdaFunction(props.targetFuntion)); 
        // need to pass target to Ordering Lambda service
        checkoutBasketRule.addTarget(new aws_events_targets_1.SqsQueue(props.targetQueue));
        bus.grantPutEventsTo(props.publisherFuntion);
        // AccessDeniedException - is not authorized to perform: events:PutEvents
    }
}
exports.SwnEventBus = SwnEventBus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRidXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudGJ1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1REFBd0Q7QUFDeEQsdUVBQTBEO0FBRzFELDJDQUF1QztBQU92QyxNQUFhLFdBQVksU0FBUSxzQkFBUztJQUV0QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXVCO1FBQzdELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsVUFBVTtRQUNWLE1BQU0sR0FBRyxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQzFDLFlBQVksRUFBRSxhQUFhO1NBQzlCLENBQUMsQ0FBQztRQUVILE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxpQkFBSSxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUM1RCxRQUFRLEVBQUUsR0FBRztZQUNiLE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLDhDQUE4QztZQUMzRCxZQUFZLEVBQUU7Z0JBQ1YsTUFBTSxFQUFFLENBQUMsK0JBQStCLENBQUM7Z0JBQ3pDLFVBQVUsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2FBQ2pDO1lBQ0QsUUFBUSxFQUFFLG9CQUFvQjtTQUNqQyxDQUFDLENBQUM7UUFFSCxvREFBb0Q7UUFDcEQsMEVBQTBFO1FBRTFFLGlEQUFpRDtRQUNqRCxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSw2QkFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBRTlELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6Qyx5RUFBeUU7SUFFakYsQ0FBQztDQUVKO0FBaENELGtDQWdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50QnVzLCBSdWxlIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1ldmVudHNcIjtcbmltcG9ydCB7IFNxc1F1ZXVlIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1ldmVudHMtdGFyZ2V0c1wiO1xuaW1wb3J0IHsgSUZ1bmN0aW9uIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7IElRdWV1ZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3Mtc3FzXCI7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xuXG5pbnRlcmZhY2UgU3duRXZlbnRCdXNQcm9wcyB7XG4gICAgcHVibGlzaGVyRnVudGlvbjogSUZ1bmN0aW9uO1xuICAgIHRhcmdldFF1ZXVlOiBJUXVldWU7XG59XG5cbmV4cG9ydCBjbGFzcyBTd25FdmVudEJ1cyBleHRlbmRzIENvbnN0cnVjdCB7XG5cbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU3duRXZlbnRCdXNQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgICAgIC8vZXZlbnRidXNcbiAgICAgICAgY29uc3QgYnVzID0gbmV3IEV2ZW50QnVzKHRoaXMsICdTd25FdmVudEJ1cycsIHtcbiAgICAgICAgICAgIGV2ZW50QnVzTmFtZTogJ1N3bkV2ZW50QnVzJ1xuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgY29uc3QgY2hlY2tvdXRCYXNrZXRSdWxlID0gbmV3IFJ1bGUodGhpcywgJ0NoZWNrb3V0QmFza2V0UnVsZScsIHtcbiAgICAgICAgICAgIGV2ZW50QnVzOiBidXMsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdXaGVuIEJhc2tldCBtaWNyb3NlcnZpY2UgY2hlY2tvdXQgdGhlIGJhc2tldCcsXG4gICAgICAgICAgICBldmVudFBhdHRlcm46IHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IFsnY29tLnN3bi5iYXNrZXQuY2hlY2tvdXRiYXNrZXQnXSxcbiAgICAgICAgICAgICAgICBkZXRhaWxUeXBlOiBbJ0NoZWNrb3V0QmFza2V0J11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBydWxlTmFtZTogJ0NoZWNrb3V0QmFza2V0UnVsZSdcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIC8vIC8vIG5lZWQgdG8gcGFzcyB0YXJnZXQgdG8gT3JkZXJpbmcgTGFtYmRhIHNlcnZpY2VcbiAgICAgICAgLy8gY2hlY2tvdXRCYXNrZXRSdWxlLmFkZFRhcmdldChuZXcgTGFtYmRhRnVuY3Rpb24ocHJvcHMudGFyZ2V0RnVudGlvbikpOyBcblxuICAgICAgICAvLyBuZWVkIHRvIHBhc3MgdGFyZ2V0IHRvIE9yZGVyaW5nIExhbWJkYSBzZXJ2aWNlXG4gICAgICAgIGNoZWNrb3V0QmFza2V0UnVsZS5hZGRUYXJnZXQobmV3IFNxc1F1ZXVlKHByb3BzLnRhcmdldFF1ZXVlKSk7XG4gICAgICAgIFxuICAgICAgICBidXMuZ3JhbnRQdXRFdmVudHNUbyhwcm9wcy5wdWJsaXNoZXJGdW50aW9uKTtcbiAgICAgICAgICAgIC8vIEFjY2Vzc0RlbmllZEV4Y2VwdGlvbiAtIGlzIG5vdCBhdXRob3JpemVkIHRvIHBlcmZvcm06IGV2ZW50czpQdXRFdmVudHNcblxuICAgIH1cblxufSJdfQ==