﻿import React from "react";
import {Step, StepLabel, Stepper, Typography} from '@material-ui/core';
import {MuiThemeProvider} from '@material-ui/core/styles';
import TestSwitchStepIcon from "../TestLibraryStepperIcons/TestLibraryStepperIcons";
import {h1Style, TestSwitchConnector, TestSwitchTheme} from "../TestLibraryOverrides/TestLibraryOverrides"
import scss from '../TestLibraryStepper/TestLibraryStepper.module.scss';
import {TestList} from "../CandidateTestView/Tests/TestList";
import {testToRender} from "../../pages";
import TokenLink from "../TokenLink/TokenLink";

interface CandidateTestStatus {
    testName: string;
    testStatus: string;
}

interface TestLibraryStepperProps {
    candidateTestStatuses: CandidateTestStatus[];
}

function getSteps(): string[] {
    //set labels for steps
    const testLabelArray = TestList.map(test => test.title)
    const dummyTest = testLabelArray.shift();
    return testLabelArray;
}

function getActiveStep(testArr: CandidateTestStatus[]): number {
    //check for number of completed tests
    const completedTests = (testArr.filter(({testStatus}) => testStatus === "Completed"));
    return completedTests.length;
}


export default function TestLibraryStepper(props: TestLibraryStepperProps): JSX.Element {
    const steps = getSteps();
    const activeStep = getActiveStep(props.candidateTestStatuses);

    return (
        <article className="stepperContainer">
            <MuiThemeProvider theme={TestSwitchTheme}>
                <Stepper style={{backgroundColor: "transparent"}} alternativeLabel activeStep={activeStep}
                         connector
                             ={<TestSwitchConnector/>}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel StepIconComponent={TestSwitchStepIcon} className="stepLabel"><h1
                                style={h1Style}>{label}</h1>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </MuiThemeProvider>
            <section className="stepperBtnContainer">
                {activeStep === steps.length ? (
                    <Typography style={h1Style} align={"center"} className="finished">
                        All tests completed.
                    </Typography>
                ) : (
                    <Typography align={"center"}>
                        <TokenLink href={'/testpage'} as={testToRender.title}>
                            <a className={scss.buttonYellow}>
                                {activeStep === steps.length - 1 ? 'Start Final Test' : `Start Test ${activeStep + 1}`}
                            </a>
                        </TokenLink>
                    </Typography>
                )}
            </section>
        </article>
    )
}

