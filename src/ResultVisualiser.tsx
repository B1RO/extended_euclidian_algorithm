import {
    ExtendedCoefficients,
    extendedEuclidianAlgorithm,
    ExtendedEuclidianAlgorithmResult
} from "./ExtendedEuclidianAlgorithm";
import {Switch, Timeline} from "antd";
import React, {useState} from "react";
import Title from "antd/es/typography/Title";

export const ResultVisualiser = ({result}: {result : ExtendedEuclidianAlgorithmResult}) => {
    let {history, gcd, alpha, beta} = result;
    let startA = history[0]["a"];
    let startB = history[0]["b"];
    return (
        <div>
            <Title level={4}>GCD of <span style={{color: "#4A148C"}}>{startA}</span> and <span
                style={{color: "#4A148C"}}>{startB}</span></Title>
            <Timeline>
                {history.map(({a, b, c, d, e, f}, index) => {
                    let {gcd, alpha,beta} = extendedEuclidianAlgorithm([{a,b, c : 1,  d: 0,  e : 0,  f: 1}])
                    return <Timeline.Item key={index}>
                        gcd({a},{b}) | {Math.floor(b/a)} | {alpha} {beta}
                        <br/>
                        {a} = {c}*{history[0].a} + {d}*{history[0].b}
                        <br/>
                        {b} = {e}*{history[0].a} + {f}*{history[0].b}
                        <br/>
                    </Timeline.Item>
                })}
            </Timeline>
            <Title level={4}>Solution: {gcd}  = {alpha} * <span style={{color: "#4A148C"}}>{history[0]["a"]}</span>
                + {beta} *
                <span
                    style={{color: "#4A148C"}}>{history[0]["b"]}</span>
            </Title>
        </div>
    )
}