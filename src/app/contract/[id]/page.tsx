'use client'
  
import useProposal from "@/app/hooks/useProposal"
import * as S from './style'
import * as SG from '@/app/styles/global'
import Loading from "@/app/components/Loading";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { formatCpfCnpj, formatPhoneNumber } from "@/app/utils";
import useContract from "@/app/hooks/useContract";
import { toast, ToastContainer } from "react-toastify";

export type Inputs = {
  name: string,
  whatsapp: string,
  email: string,
  document: string,
  marital_status?: string,
  profession?: string,
  is_company: 'pf' | 'pj',
  responsable_name?: string,
  responsable_phone?: string,
  responsable_document?: string,
  responsable_marital_status?: string,
  responsable_professional?: string,
  uc: string,
  zipcode: string,
  address: string,
  number: string,
  neighborhood: string,
  state: string,
  city: string,
  complement: string
};


export default function ContractPage() {
    const { register, handleSubmit, control, clearErrors, setValue, resetField, formState: { errors } } = useForm<Inputs>({
        shouldUnregister: true,
        defaultValues: {
            name: '',
            whatsapp: '',
            email: '',
            document: '',
            marital_status: '',
            profession: '',
            responsable_name: '',
            responsable_document: '',
            responsable_marital_status: '',
            responsable_phone: '',
            responsable_professional: '',
            zipcode: '',
            uc: '',
            address: '',
            number: '',
            neighborhood: '',
            state: '',
            city: '',
            complement: '',
            is_company: 'pf'
        }
    });
    const { loading, proposal, updateLead } = useContract()

     const isCompany = useWatch({
        control,
        name: "is_company",
        defaultValue: "pf"
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await updateLead(data)
    };
    const isPessoaFisica = isCompany === 'pf'

    const textBtn = loading ? 'Salvando...' : 'Salvar'

    const valuesWatch = useWatch({
        control,
        name: ["document", "responsable_document", "whatsapp", "responsable_phone", "zipcode"],
    });

    const [document, responsable_document, whatsapp, responsable_phone, zipcode] = valuesWatch

    const onCheckCEP = async (cep: string) => {
        try {
            const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const response = await request.json()
            setValue('address', response.logradouro)
            setValue('neighborhood', response.bairro)
            setValue('state', response.uf)
            setValue('city', response.localidade)
        } catch (err) {
            
        }
        
    }

    useEffect(() => {
        if(document && document !== formatCpfCnpj(document)) {
            setValue("document", formatCpfCnpj(document))
        }

        if(responsable_document && responsable_document !== formatCpfCnpj(responsable_document)) {
            setValue("responsable_document", formatCpfCnpj(responsable_document))
        }

        if(whatsapp && whatsapp !== formatPhoneNumber(whatsapp)) {
            setValue("whatsapp", formatPhoneNumber(whatsapp))
        }

        if(responsable_phone && responsable_phone !== formatPhoneNumber(responsable_phone)) {
            setValue("responsable_phone", formatPhoneNumber(responsable_phone))
        }

    }, [document, responsable_document, whatsapp, responsable_phone, isCompany])

    useEffect(() => {
        if(proposal) {
            setValue('name', proposal.user.name)
            setValue('whatsapp', proposal.user.whatsapp)
        }
    }, [proposal])

    useEffect(() => {
        if(zipcode.length === 8) {
            onCheckCEP(zipcode)
        }
    }, [zipcode])

    useEffect(() => {
        if(isCompany) {
            resetField("name")
            resetField("document")
            resetField("marital_status")
            resetField("profession")
            resetField("responsable_name")
            resetField("responsable_document")
            resetField("responsable_phone")
            resetField("responsable_professional")
            resetField("responsable_marital_status")
            clearErrors()
        }
    }, [isCompany])


    if(loading) {
        return <Loading headline="Carregando proposta para contrato..." />
    }

    if(!proposal) {
        return <h1>Proposta nao existente</h1>
    }
    
    return (
        <>
        <ToastContainer />
        <S.ContainerGeral>
            <S.Header>
                <S.Branding>
                    <img src="/logotipo.png" alt="C6 ENERGY" />
                    <S.BrandingText>A Maior inteligencia de energia do Brasil </S.BrandingText>
                </S.Branding>
                <S.HeadingContact>
                    <p>C6 ENERGY | 45.506.222/0001-19</p>
                    <p>ENDEREÇO: R. Dr. Bráulio Gomes, 107 - 01047-020</p>
                    <p>São Paulo, SP</p>
                </S.HeadingContact>
            </S.Header>
            <S.SubHeading>Preencher proposta</S.SubHeading>
            <S.Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                <S.FormControl>
                    <S.Label>Dados {isPessoaFisica ? 'pessoais' : 'da empresa'}</S.Label>
                    <S.FormControlRadio>
                        <S.LabelCheck htmlFor="pf">
                            <input type="radio" {...register("is_company")} id="pf" value="pf" />
                            Pessoa Fisica
                        </S.LabelCheck>
                        <S.LabelCheck htmlFor="pj">
                            <input type="radio" {...register("is_company")} id="pj" value="pj" />
                            Pessoa Juridica
                        </S.LabelCheck>
                    </S.FormControlRadio>
                    <S.FormControlField>
                        <S.Input type="text" error={errors.document !== undefined} placeholder={isPessoaFisica ? 'CPF' : 'CNPJ'} {...register("document", { required: true })} />
                        {errors.document && <S.ErrorField>Por favor informe o {isPessoaFisica ? 'CPF' : 'CNPJ'}.</S.ErrorField>}
                    </S.FormControlField>
                    <S.FormControlField>
                        <S.Input type="text" error={errors.name !== undefined} placeholder={isPessoaFisica ? 'Nome completo' : 'Razão Social'} {...register("name", { required: true })} />
                        {errors.name && <S.ErrorField>Por favor informe {isPessoaFisica ? 'o nome completo' : 'a razão social'}.</S.ErrorField>}
                    </S.FormControlField>
                   
                   <S.FormControlField>
                        <S.Input type="text" error={errors.whatsapp !== undefined} placeholder="WhatsApp" {...register("whatsapp", { required: true })} />
                        {errors.whatsapp && <S.ErrorField>Por favor informe o WhatsApp.</S.ErrorField>}
                    </S.FormControlField>
                    <S.FormControlField>
                        <S.Input type="text" error={errors.email !== undefined} placeholder="email" {...register("email", { required: true })} />
                        {errors.email && <S.ErrorField>Por favor informe o WhatsApp.</S.ErrorField>}
                    </S.FormControlField>
                    {
                        isPessoaFisica && (
                            <>
                                <S.FormControlField>
                                    <S.Input type="text" error={errors.marital_status !== undefined} placeholder="Estado civil" {...register("marital_status", { required: true })} />
                                    {errors.marital_status && <S.ErrorField>Por favor o estado civil.</S.ErrorField>}
                                </S.FormControlField>
                                <S.FormControlField>
                                    <S.Input type="text" error={errors.marital_status !== undefined} placeholder="Profissão" {...register("profession", { required: true })} />
                                    {errors.marital_status && <S.ErrorField>Por favor a profissão.</S.ErrorField>}
                                </S.FormControlField>
                            </>
                        )
                    }
                    
                </S.FormControl>
                {
                    !isPessoaFisica && (
                        <S.FormControl>
                            <S.Label>Responsável pela empresa</S.Label>
                            <S.FormControlField>
                                <S.Input type="text" error={errors.responsable_name !== undefined} placeholder="Nome completo" {...register("responsable_name", { required: true })} />
                                {errors.responsable_name && <S.ErrorField>Por favor informe o nome completo do responsável.</S.ErrorField>}
                            </S.FormControlField>
                            <S.FormControlField>
                                <S.Input type="text" error={errors.responsable_document !== undefined} placeholder="CPF" {...register("responsable_document", { required: true })} />
                                {errors.responsable_document && <S.ErrorField>Por favor informe o CPF do responsável.</S.ErrorField>}
                            </S.FormControlField>
                            <S.FormControlField>
                                <S.Input type="text" error={errors.responsable_phone !== undefined} placeholder="Telefone" {...register("responsable_phone", { required: true })} />
                                {errors.responsable_phone && <S.ErrorField>Por favor informe o telefone do responsável.</S.ErrorField>}
                            </S.FormControlField>
                            <S.FormControlField>
                                <S.Input type="text" error={errors.responsable_marital_status !== undefined} placeholder="Estado civil" {...register("responsable_marital_status", { required: true })} />
                                {errors.responsable_marital_status && <S.ErrorField>Por favor informe o estado civil do responsável.</S.ErrorField>}
                            </S.FormControlField>
                            <S.FormControlField>
                                <S.Input type="text" error={errors.responsable_professional !== undefined} placeholder="Profissão" {...register("responsable_professional", { required: true })} />
                                {errors.responsable_professional && <S.ErrorField>Por favor informe a profissão do responsável.</S.ErrorField>}
                            </S.FormControlField>
                        </S.FormControl>
                    )
                }
                <S.FormControl>
                    <S.Label>Conta de energia</S.Label>
                    <S.FormControlField>
                        <S.Input type="text" error={errors.uc !== undefined} placeholder="Código de instalação / Seu Código" {...register("uc", { required: true })} />
                        {errors.uc && <S.ErrorField>Por favor informe .</S.ErrorField>}
                    </S.FormControlField>
                </S.FormControl>
                <S.FormControl>
                    <S.Label>Endereço</S.Label>
                    <S.FormControlField>
                        <S.Input type="number" error={errors.zipcode !== undefined} placeholder="CEP" {...register("zipcode", { required: true })} />
                        {errors.zipcode && <S.ErrorField>Por favor informe o cep.</S.ErrorField>}
                    </S.FormControlField>
                    <S.FormControlField>
                        <S.Input type="text" error={errors.address !== undefined} placeholder="Logradouro" {...register("address", { required: true })} />
                        {errors.address && <S.ErrorField>Por favor informe o logradouro.</S.ErrorField>}
                    </S.FormControlField>
                    <S.FormControlField>
                        <S.Input type="text" placeholder="Número" {...register("number", { required: false })} />
                    </S.FormControlField>
                    <S.FormControlField>
                        <S.Input type="text" placeholder="Complemento" {...register("complement", { required: false })} />
                    </S.FormControlField>
                    <S.FormControlField>
                        <S.Input type="text" error={errors.neighborhood !== undefined} placeholder="Bairro" {...register("neighborhood", { required: true })} />
                        {errors.neighborhood && <S.ErrorField>Por favor informe o bairro.</S.ErrorField>}
                    </S.FormControlField>
                    <S.FormControlField>
                        <S.Input type="text" error={errors.city !== undefined} placeholder="Cidade" {...register("city", { required: true })} />
                        {errors.city && <S.ErrorField>Por favor informe a cidade.</S.ErrorField>}
                    </S.FormControlField>
                    <S.FormControlField>
                        <S.Input type="text" error={errors.state !== undefined} placeholder="Estado" {...register("state", { required: true })} />
                        {errors.state && <S.ErrorField>Por favor informe o estado.</S.ErrorField>}
                    </S.FormControlField>
                    
                </S.FormControl>
                <SG.Button type="submit" disabled={loading}>{textBtn}</SG.Button>
                </form>
            </S.Container>
            <S.Footer>
                <S.Container>
                    <S.boxMapa>
                        <img src="/mapa.png" alt="" />
                        <S.BoxText>atendemos<br/> todo o <br/>territorio<br/> <strong>nacional</strong></S.BoxText>
                    </S.boxMapa>
                    <S.FooterBottomContainer>
                        <S.FooterTop>
                            <S.Footerimg src="/energia_limpa.png" alt="" />
                            <S.FooterTopTitle>
                                Sua parceria em <strong>energia limpa</strong> economica
                            </S.FooterTopTitle>
                        </S.FooterTop>
                        <S.FooterBottom>
                            <S.LogosRenovaveis src="/logos_renovaveis.png" alt="" />
                            <S.FooterBottomTitle>
                                <S.FooterBottomNumber>
                                    <img src="/icon-whatsapp.png" alt="" /> (11) 93908-0968
                                </S.FooterBottomNumber>
                                contato@c6energy.com.br
                                www.c6energy.com.br
                            </S.FooterBottomTitle>
                        </S.FooterBottom>
                    </S.FooterBottomContainer>
                    
                    
                </S.Container>
            </S.Footer>
        </S.ContainerGeral>
        </>
    )
}