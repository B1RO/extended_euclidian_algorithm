import {Button, Col, Empty, InputNumber, Row, Space, Typography} from "antd";
import React, {useState} from "react";
import {ResultVisualiser} from "./ResultVisualiser";

const {Title} = Typography;

export type ExtendedEuclidianAlgorithmResult = {history : Array<ExtendedCoefficients>, gcd : number, alpha : number, beta : number};
export type ExtendedCoefficients = {a : number, b : number, c : number, d : number, e : number, f : number}
export const extendedEuclidianAlgorithm: (acc: Array<ExtendedCoefficients>) => ExtendedEuclidianAlgorithmResult =
    (acc) => {
        let {a, b, c, d, e, f} = acc[0];
        if (a === 0) {
            let history = acc.reverse().slice(0, -1);
            return {history: history, alpha: history[history.length-1].c, beta : history[history.length - 1].d, gcd : history[history.length-1].a};
        }
        else
        {
            let q = Math.floor(b/a);
            let r = b%a;
            let nextE = c;
            let nextF = d;
            let nextC = (e-(q*c));
            let nextD = (f-(q*d));
            let nextCoefficients =  {a : r, b : a, c : nextC, d : nextD, e : nextE, f : nextF}
            return extendedEuclidianAlgorithm([nextCoefficients, ...acc]);
        }
    }

export const ExtendedEuclidianAlgorithm = () => {
    let [a, setA] = useState<number | null | undefined>(0);
    let [b, setB] = useState<number | null | undefined>(0);
    let [result, setResult] = useState<ExtendedEuclidianAlgorithmResult | undefined | null>(null);
    return <>
        <Row style={{height: "100vh"}} align={"middle"} justify={"center"}>
            <Col span={8}>
                <Space direction={'vertical'} align={'center'}>
                    <Space>a:<InputNumber step={1} onChange={(val) => {
                        setA(val as number)
                    }}/></Space>
                    <Space>b: <InputNumber step={1} onChange={(val) => {
                        setB(val as number)
                    }}/></Space>
                    <Button onClick={() => {
                        if (a == null || b == null) {
                            throw new Error("a or b is undefined!");
                        }
                        setResult(extendedEuclidianAlgorithm([{a,b, c : 1, d : 0, e : 0, f : 1}]));
                    }} type="primary">Go</Button>
                </Space>
            </Col>
            <Col span={8} style={{maxHeight : "80vh", overflow : "auto"}}>
                {result && <ResultVisualiser result={result}/>}
                {!result && <Empty/>}
            </Col>
        </Row>
    </>
}