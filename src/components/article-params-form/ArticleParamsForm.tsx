import React, { useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	setCurrentState: (param: ArticleStateType) => void;
	currentState: ArticleStateType;
};

export const ArticleParamsForm = ({
	currentState,
	setCurrentState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setisMenuOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectArticleState, setSelectArticleState] = useState(currentState);

	const handleToggle = () => {
		setisMenuOpen(!isMenuOpen);
	};

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({ ...selectArticleState, [key]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentState(selectArticleState);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: handleToggle,
		onChange: setisMenuOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggle} />
			<aside
				ref={rootRef}
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={45}>Задайте параметры</Text>
					<Select
						selected={selectArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => handleChange('fontFamilyOption', option)}
						title='Шрифт'></Select>
					<RadioGroup
						name={'radio'}
						options={fontSizeOptions}
						selected={selectArticleState.fontSizeOption}
						onChange={(option) => handleChange('fontSizeOption', option)}
						title={'Размер шрифта'}></RadioGroup>
					<Separator />
					<Select
						selected={selectArticleState.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
						title='Цвет шрифта'></Select>
					<Select
						selected={selectArticleState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
						title='Цвет фона'></Select>
					<Select
						selected={selectArticleState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChange('contentWidth', option)}
						title='Ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setSelectArticleState(defaultArticleState);
								setCurrentState(defaultArticleState);
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
