import { pipeline, env } from '@xenova/transformers';

class TransformerPipeline {
	static instance = null;
	static task = null;
	static model = null;

	//Translation
	static async getTranslation(progress_callback=null) {
		this.task = 'translation_en_to_de';
		this.model = 'Xenova/t5-base';

		if(this.instance == null) {
			// Note: uncomment this to change the cache directory
			//env.cacheDir = './.cache';
			this.instance = pipeline(this.task, this.model, { progress_callback });
			//this.instance = pipeline(this.task, { progress_callback });
		}
		return this.instance
	}

	//classification
	static async getClassification(progress_callback=null) {
		this.task = 'text-classification';
		this.model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';

		if(this.instance == null) {
			// Note: uncomment this to change the cache directory
			//env.cacheDir = './.cache';
			this.instance = pipeline(this.task, this.model, { progress_callback });
		}
		return this.instance
	}

	//summarization
	static async getSummary(progress_callback=null) {
		this.task = 'summarization';
		this.model = 'Xenova/distilbart-cnn-6-6';

		if(this.instance == null) {
			// Note: uncomment this to change the cache directory
			//env.cacheDir = './.cache';
			this.instance = pipeline(this.task, this.model, { progress_callback });
		}
		return this.instance
	}

}

export default TransformerPipeline;